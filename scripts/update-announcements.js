/**
 * Simple script to copy announcements from data directory to public directory
 * This allows for easy updates to the announcements without rebuilding the app
 */

const fs = require('fs');
const path = require('path');

// Define paths
const DATA_DIR = path.join(__dirname, '..', 'data');
const PUBLIC_DATA_DIR = path.join(__dirname, '..', 'public', 'data');
const ANNOUNCEMENTS_FILE = 'announcements.json';

// Ensure public data directory exists
if (!fs.existsSync(PUBLIC_DATA_DIR)) {
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
  console.log(`Created directory: ${PUBLIC_DATA_DIR}`);
}

try {
  // Read the source file
  const sourcePath = path.join(DATA_DIR, ANNOUNCEMENTS_FILE);
  const targetPath = path.join(PUBLIC_DATA_DIR, ANNOUNCEMENTS_FILE);
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source file not found at ${sourcePath}`);
    process.exit(1);
  }
  
  // Read and parse the JSON to validate it
  const fileContent = fs.readFileSync(sourcePath, 'utf8');
  JSON.parse(fileContent); // Will throw if invalid JSON
  
  // Copy the file
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`✓ Successfully updated announcements from ${sourcePath} to ${targetPath}`);
  console.log('Announcements will be updated on the website immediately.');
} catch (error) {
  console.error(`✗ Error updating announcements: ${error.message}`);
  process.exit(1);
} 