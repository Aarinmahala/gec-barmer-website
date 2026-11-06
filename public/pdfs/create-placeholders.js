/**
 * Script to create placeholder HTML files for PDF links
 * Run this script with Node.js from the public/pdfs directory
 */

const fs = require('fs');
const path = require('path');

// List of PDF files needed
const pdfFiles = [
  'grievance-redressal.pdf',
  'anti-ragging-policy.pdf',
  'women-gender-cell.pdf',
  'sc-st-cell.pdf',
  'syllabus.pdf',
  'academic-calendar.pdf',
  'results.pdf',
  'nss-information.pdf',
  'ncc-information.pdf'
];

// Read the placeholder HTML content
const placeholderContent = fs.readFileSync(path.join(__dirname, 'placeholder.html'), 'utf8');

// Create a placeholder file for each PDF
pdfFiles.forEach(pdfFile => {
  const filePath = path.join(__dirname, pdfFile);
  
  // Create HTML file with the same name as the PDF
  const htmlFilePath = filePath.replace('.pdf', '.html');
  
  // Write the placeholder content to the HTML file
  fs.writeFileSync(htmlFilePath, placeholderContent);
  
  console.log(`Created placeholder: ${htmlFilePath}`);
});

console.log('All placeholder files created successfully!'); 