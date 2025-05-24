/**
 * API utilities for connecting to the backend server
 */

// API base URL (defaults to local development server)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Check if the API server is running
 * @returns {Promise<boolean>} True if server is running
 */
export const checkServerStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ping`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('API server check error:', error);
    return false;
  }
};

/**
 * Updates source files directly in the codebase
 * @param {string} dataType - Type of data to update ('imageLinks', 'announcements', 'links', 'leadership', 'ncc', 'nss', 'studentClubs', 'faculty' or 'all')
 * @param {object} data - The data to use for the update
 * @returns {Promise<object>} Result of the operation
 */
export const updateSourceFiles = async (dataType, data) => {
  try {
    console.log(`Attempting to update source files for ${dataType}...`);
    
    // First check if server is running
    const isServerRunning = await checkServerStatus();
    if (!isServerRunning) {
      console.error('API server is not running');
      return {
        success: false,
        message: 'API server is not running. Please start the server first.',
      };
    }
    
    const payload = {
      dataType,
      data,
    };
    
    console.log(`Sending update request to ${API_BASE_URL}/update-source`);
    
    const response = await fetch(`${API_BASE_URL}/update-source`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('API error response:', result);
      throw new Error(result.message || 'Failed to update source files');
    }

    console.log('Update source files result:', result);
    return result;
  } catch (error) {
    console.error('API error:', error);
    return {
      success: false,
      message: error.message || 'Failed to communicate with the server',
    };
  }
};

/**
 * Convenience function to update all data types at once
 * @returns {Promise<object>} Result of the operation
 */
export const updateAllSourceFiles = async () => {
  try {
    // Collect all data from localStorage
    const data = {
      imageLinks: JSON.parse(localStorage.getItem('college_website_image_links')),
      announcements: JSON.parse(localStorage.getItem('college_website_announcements')),
      links: JSON.parse(localStorage.getItem('college_website_links')),
      leadership: JSON.parse(localStorage.getItem('college_website_leadership')),
      ncc: JSON.parse(localStorage.getItem('college_website_ncc')),
      nss: JSON.parse(localStorage.getItem('college_website_nss')),
      faculty: JSON.parse(localStorage.getItem('college_website_faculty')),
      studentClubs: JSON.parse(localStorage.getItem('college_website_student_clubs'))
    };
    
    // Filter out null values (for data types that don't exist yet)
    Object.keys(data).forEach(key => {
      if (data[key] === null) {
        delete data[key];
      }
    });
    
    // Send request to update all data types
    return await updateSourceFiles('all', data);
  } catch (error) {
    console.error('Error updating all source files:', error);
    return {
      success: false, 
      message: error.message || 'Failed to update all source files',
    };
  }
}; 