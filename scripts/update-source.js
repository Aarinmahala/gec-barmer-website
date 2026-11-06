const fs = require('fs');
const path = require('path');

// Process command line arguments
const args = process.argv.slice(2);
const dataType = args[0]; // 'imageLinks', 'announcements', 'links', 'leadership', 'ncc', 'nss', 'faculty', 'studentClubs' or 'all'
const dataFilePath = args[1]; // Path to JSON file with exported data

// Path to source directory
const SRC_DIR = path.join(__dirname, '..', 'src');
const UTILS_DIR = path.join(SRC_DIR, 'utils');

// Map of data types to their source files
const DATA_FILES = {
  imageLinks: path.join(UTILS_DIR, 'ImageLinks.js'),
  announcements: {
    file: path.join(UTILS_DIR, 'AnnouncementContext.js'),
    variableName: 'defaultAnnouncements'
  },
  links: {
    file: path.join(UTILS_DIR, 'LinkContext.js'),
    variableName: 'defaultLinks'
  },
  leadership: {
    file: path.join(UTILS_DIR, 'LeadershipContext.js'),
    variableName: 'defaultLeadershipData'
  },
  ncc: {
    file: path.join(UTILS_DIR, 'NCCContext.js'),
    variableName: 'defaultNCCData'
  },
  nss: {
    file: path.join(UTILS_DIR, 'NSSContext.js'),
    variableName: 'defaultNSSData'
  },
  faculty: {
    file: path.join(UTILS_DIR, 'FacultyContext.js'),
    variableName: 'defaultFacultyData'
  },
  studentClubs: {
    file: path.join(UTILS_DIR, 'StudentClubsContext.js'),
    variableName: 'defaultStudentClubsData'
  }
};

// Generate JS code for a variable
function generateJSCode(variableName, data) {
  const jsonString = JSON.stringify(data, null, 2);
  
  // Format the string for better readability in code
  const formattedString = jsonString
    .replace(/"([^"]+)":/g, '$1:')  // Remove quotes from object keys
    .replace(/"/g, "'");            // Replace remaining double quotes with single quotes
  
  // Create a JavaScript module with appropriate export
  return `// Auto-generated file from admin panel changes
// Last updated: ${new Date().toLocaleString()}

const ${variableName} = ${formattedString};

export default ${variableName};
`;
}

// Update a complete file
function updateCompleteFile(filePath, data, variableName) {
  try {
    const jsCode = generateJSCode(variableName, data);
    fs.writeFileSync(filePath, jsCode, 'utf8');
    console.log(`✓ Successfully updated ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error updating ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

// Update a variable within a file
function updateVariableInFile(config, data) {
  try {
    const { file, variableName } = config;
    
    // If file doesn't exist, create it with the new data
    if (!fs.existsSync(file)) {
      const jsCode = generateJSCode(variableName, data);
      fs.writeFileSync(file, jsCode, 'utf8');
      console.log(`✓ Created new file ${path.basename(file)}`);
      return true;
    }
    
    const content = fs.readFileSync(file, 'utf8');
    
    // Create pattern to find the variable declaration
    const pattern = new RegExp(`const\\s+${variableName}\\s*=\\s*{[^;]*};`, 's');
    
    // Generate new variable declaration
    const jsonString = JSON.stringify(data, null, 2);
    const formattedString = jsonString
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/"/g, "'");
    const newDeclaration = `const ${variableName} = ${formattedString};`;
    
    // Replace the variable in file content
    if (pattern.test(content)) {
      const updatedContent = content.replace(pattern, newDeclaration);
      fs.writeFileSync(file, updatedContent, 'utf8');
      console.log(`✓ Successfully updated ${variableName} in ${path.basename(file)}`);
      return true;
    } else {
      // If pattern not found, but file exists, we need to generate a complete context file
      const contextFileContent = `// Auto-generated file from admin panel changes
// Last updated: ${new Date().toLocaleString()}
import React, { createContext, useContext, useState, useEffect } from 'react';

const ${variableName} = ${formattedString};

const ${variableName.replace('default', '')}Context = createContext();

export const ${variableName.replace('default', '')}Provider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Try to get data from localStorage
    const storedData = localStorage.getItem('college_website_${variableName.toLowerCase().replace('default', '').replace('data', '')}');
    return storedData ? JSON.parse(storedData) : ${variableName};
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('college_website_${variableName.toLowerCase().replace('default', '').replace('data', '')}', JSON.stringify(data));
  }, [data]);

  // Function to update data
  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <${variableName.replace('default', '')}Context.Provider value={{ data, updateData }}>
      {children}
    </${variableName.replace('default', '')}Context.Provider>
  );
};

export const use${variableName.replace('default', '')} = () => useContext(${variableName.replace('default', '')}Context);

export default ${variableName};
`;
      fs.writeFileSync(file, contextFileContent, 'utf8');
      console.log(`✓ Created new context file ${path.basename(file)} with ${variableName}`);
      return true;
    }
  } catch (error) {
    console.error(`✗ Error updating variable:`, error.message);
    return false;
  }
}

// Main function to process the update
async function updateSourceFiles() {
  try {
    // Verify arguments
    if (!dataType || !dataFilePath) {
      console.error('Usage: node update-source.js <dataType> <dataFilePath>');
      console.error('dataType can be: imageLinks, announcements, links, leadership, ncc, nss, faculty, studentClubs, or all');
      process.exit(1);
    }
    
    // Check if data file exists
    if (!fs.existsSync(dataFilePath)) {
      console.error(`Data file does not exist: ${dataFilePath}`);
      process.exit(1);
    }
    
    // Read and parse the data file
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(rawData);
    
    console.log('=== Updating Source Files ===');
    
    // Handle different data types
    if (dataType === 'all') {
      // Process all data types
      Object.keys(DATA_FILES).forEach(type => {
        if (!data[type]) {
          console.log(`ℹ Skipping ${type} - no data provided`);
          return;
        }
        
        const config = DATA_FILES[type];
        if (typeof config === 'string') {
          // Direct file replacement
          updateCompleteFile(config, data[type], type);
        } else {
          // Variable replacement within file
          updateVariableInFile(config, data[type]);
        }
      });
    } else {
      // Process single data type
      const config = DATA_FILES[dataType];
      if (!config) {
        console.error(`✗ Unknown data type: ${dataType}`);
        process.exit(1);
      }
      
      if (typeof config === 'string') {
        // Direct file replacement
        updateCompleteFile(config, data, dataType);
      } else {
        // Variable replacement within file
        updateVariableInFile(config, data);
      }
    }
    
    console.log('=== Update Complete ===');
  } catch (error) {
    console.error('Error updating source files:', error.message);
    process.exit(1);
  }
}

// Run the main function
updateSourceFiles(); 