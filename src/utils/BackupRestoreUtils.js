/**
 * Utilities for backing up website data and restoring from backups
 * This allows more direct saving and loading of site content
 */

// Create a backup file that contains all website data
export const createCompleteBackup = () => {
  try {
    // Collect all data from localStorage
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data: {
        imageLinks: getStorageItem('college_website_image_links'),
        announcements: getStorageItem('college_website_announcements'),
        links: getStorageItem('college_website_links'),
        leadership: getStorageItem('college_website_leadership')
      }
    };

    // Create downloadable JSON file
    const jsonString = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `college-website-backup-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    return { 
      success: true, 
      message: 'Complete backup created and downloaded successfully'
    };
  } catch (error) {
    console.error('Error creating backup:', error);
    return { 
      success: false, 
      message: `Backup failed: ${error.message}`
    };
  }
};

// Restore from a backup file
export const restoreFromBackup = async (file) => {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const backup = JSON.parse(event.target.result);
          
          // Validate backup file
          if (!backup.version || !backup.data) {
            reject({ success: false, message: 'Invalid backup file format' });
            return;
          }
          
          // Restore each data type
          if (backup.data.imageLinks) {
            localStorage.setItem('college_website_image_links', JSON.stringify(backup.data.imageLinks));
          }
          
          if (backup.data.announcements) {
            localStorage.setItem('college_website_announcements', JSON.stringify(backup.data.announcements));
          }
          
          if (backup.data.links) {
            localStorage.setItem('college_website_links', JSON.stringify(backup.data.links));
          }
          
          if (backup.data.leadership) {
            localStorage.setItem('college_website_leadership', JSON.stringify(backup.data.leadership));
          }
          
          resolve({ 
            success: true, 
            message: 'Backup restored successfully. Please refresh the page to see changes.'
          });
        } catch (error) {
          reject({ 
            success: false, 
            message: `Failed to parse backup: ${error.message}`
          });
        }
      };
      
      reader.onerror = () => {
        reject({ 
          success: false, 
          message: 'Failed to read backup file'
        });
      };
      
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('Error restoring backup:', error);
    return { 
      success: false, 
      message: `Restore failed: ${error.message}`
    };
  }
};

// Reset everything to factory defaults
export const resetToFactoryDefaults = () => {
  try {
    // Clear all website data from localStorage
    localStorage.removeItem('college_website_image_links');
    localStorage.removeItem('college_website_announcements');
    localStorage.removeItem('college_website_links');
    localStorage.removeItem('college_website_leadership');
    
    return { 
      success: true, 
      message: 'Website reset to factory defaults. Please refresh the page to see changes.'
    };
  } catch (error) {
    console.error('Error resetting to defaults:', error);
    return { 
      success: false, 
      message: `Reset failed: ${error.message}`
    };
  }
};

// Helper function to safely get items from localStorage
const getStorageItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
}; 