const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../build')));

// Temp directory for storing exports
const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

// API endpoint to update source files
app.post('/api/update-source', async (req, res) => {
  try {
    const { dataType, data } = req.body;
    
    if (!dataType || !data) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required parameters' 
      });
    }
    
    // Save data to temp file
    const timestamp = Date.now();
    const tempFilePath = path.join(TEMP_DIR, `${dataType}-${timestamp}.json`);
    
    fs.writeFileSync(tempFilePath, JSON.stringify(data, null, 2));
    
    // Run the update-source script
    exec(`node ${path.join(__dirname, 'update-source.js')} ${dataType} ${tempFilePath}`, 
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).json({ 
            success: false, 
            message: `Failed to update source files: ${error.message}`,
            error: stderr 
          });
        }
        
        // Log output
        console.log(stdout);
        
        // Clean up temp file
        fs.unlinkSync(tempFilePath);
        
        res.json({ 
          success: true, 
          message: 'Source files updated successfully',
          output: stdout 
        });
      });
  } catch (error) {
    console.error('Error updating source:', error);
    res.status(500).json({ 
      success: false, 
      message: `Server error: ${error.message}` 
    });
  }
});

// Manual export endpoint for downloading JSON data
app.get('/api/export/:dataType', (req, res) => {
  const { dataType } = req.params;
  const dataTypes = ['imageLinks', 'announcements', 'links', 'leadership', 'ncc', 'nss', 'faculty', 'studentClubs'];
  
  if (!dataTypes.includes(dataType)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid data type' 
    });
  }
  
  try {
    // Get data from the appropriate context file
    const dataFile = path.join(__dirname, '../src/utils', `${dataType.charAt(0).toUpperCase() + dataType.slice(1)}Context.js`);
    
    if (!fs.existsSync(dataFile)) {
      return res.status(404).json({ 
        success: false, 
        message: `Data file not found: ${dataFile}` 
      });
    }
    
    // Generate a JSON file for download
    const timestamp = Date.now();
    const exportFile = path.join(TEMP_DIR, `${dataType}-export-${timestamp}.json`);
    
    // For a real implementation, we'd extract the data from the JS file
    // Here we'll just provide the template for manual export
    const storageKey = `college_website_${dataType.toLowerCase()}`;
    
    res.json({
      success: true,
      message: 'Export data prepared',
      instructions: `To export ${dataType} data, run the following command in your browser console:`,
      command: `copy(JSON.stringify(JSON.parse(localStorage.getItem('${storageKey}')), null, 2))`,
      note: 'After running this command, the data will be copied to your clipboard. Paste it into a text file and save it with a .json extension.'
    });
    
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ 
      success: false, 
      message: `Server error: ${error.message}` 
    });
  }
});

// Handle other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin update server available at http://localhost:${PORT}/api/update-source`);
}); 