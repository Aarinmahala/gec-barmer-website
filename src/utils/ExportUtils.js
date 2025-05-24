/**
 * Utilities for exporting content from localStorage to permanent code files
 * This allows admin changes to be made permanent in the codebase
 */

// Function to generate JS code for default data objects
const generateJSCode = (variableName, data) => {
  // Convert data object to a formatted string
  const jsonString = JSON.stringify(data, null, 2);
  
  // Replace double quotes with single quotes for better readability in code
  const formattedString = jsonString
    .replace(/"([^"]+)":/g, '$1:')  // Remove quotes from object keys
    .replace(/"/g, "'");            // Replace remaining double quotes with single quotes
  
  // Create a JavaScript module with appropriate export
  return `// Auto-generated file from admin panel changes
// Last updated: ${new Date().toLocaleString()}

const ${variableName} = ${formattedString};

export default ${variableName};
`;
};

// Generate downloadable file for users to save
const downloadJSFile = (filename, content) => {
  // Create a blob with the content
  const blob = new Blob([content], { type: 'text/javascript' });
  
  // Create a link element to download the file
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  
  return true;
};

// Export image links data
export const exportImageLinks = () => {
  try {
    const storedData = localStorage.getItem('college_website_image_links');
    if (!storedData) {
      return { success: false, message: 'No image links data found in localStorage' };
    }
    
    const parsedData = JSON.parse(storedData);
    const jsCode = generateJSCode('ImageLinks', parsedData);
    downloadJSFile('ImageLinks.js', jsCode);
    
    return { 
      success: true, 
      message: 'ImageLinks.js file has been generated and downloaded. Replace the existing file in src/utils/ with this file to make changes permanent.' 
    };
  } catch (error) {
    console.error('Error exporting image links:', error);
    return { success: false, message: `Export failed: ${error.message}` };
  }
};

// Export announcements data
export const exportAnnouncements = () => {
  try {
    const storedData = localStorage.getItem('college_website_announcements');
    if (!storedData) {
      return { success: false, message: 'No announcements data found in localStorage' };
    }
    
    const parsedData = JSON.parse(storedData);
    const jsCode = generateJSCode('defaultAnnouncements', parsedData);
    downloadJSFile('DefaultAnnouncements.js', jsCode);
    
    return { 
      success: true,
      message: 'DefaultAnnouncements.js file has been generated and downloaded. Copy the content to replace the default data in AnnouncementContext.js to make changes permanent.'
    };
  } catch (error) {
    console.error('Error exporting announcements:', error);
    return { success: false, message: `Export failed: ${error.message}` };
  }
};

// Export links data
export const exportLinks = () => {
  try {
    const storedData = localStorage.getItem('college_website_links');
    if (!storedData) {
      return { success: false, message: 'No links data found in localStorage' };
    }
    
    const parsedData = JSON.parse(storedData);
    const jsCode = generateJSCode('defaultLinks', parsedData);
    downloadJSFile('DefaultLinks.js', jsCode);
    
    return { 
      success: true,
      message: 'DefaultLinks.js file has been generated and downloaded. Copy the content to replace the default data in LinkContext.js to make changes permanent.'
    };
  } catch (error) {
    console.error('Error exporting links:', error);
    return { success: false, message: `Export failed: ${error.message}` };
  }
};

// Export leadership data
export const exportLeadership = () => {
  try {
    const storedData = localStorage.getItem('college_website_leadership');
    if (!storedData) {
      return { success: false, message: 'No leadership data found in localStorage' };
    }
    
    const parsedData = JSON.parse(storedData);
    const jsCode = generateJSCode('defaultLeadershipData', parsedData);
    downloadJSFile('DefaultLeadershipData.js', jsCode);
    
    return { 
      success: true,
      message: 'DefaultLeadershipData.js file has been generated and downloaded. Copy the content to replace the default data in LeadershipContext.js to make changes permanent.'
    };
  } catch (error) {
    console.error('Error exporting leadership data:', error);
    return { success: false, message: `Export failed: ${error.message}` };
  }
};

// Export all data
export const exportAllData = () => {
  const results = {
    imageLinks: exportImageLinks(),
    announcements: exportAnnouncements(),
    links: exportLinks(),
    leadership: exportLeadership()
  };
  
  return results;
}; 