/**
 * Script to create placeholder HTML files for PDF links
 * Run this script with Node.js
 */

const fs = require('fs');
const path = require('path');

console.log('Creating PDF placeholders...');

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

// Base HTML template for placeholders
const createPlaceholderHTML = (title) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            max-width: 600px;
            width: 100%;
            text-align: center;
        }
        h1 {
            color: #1e3a8a;
            margin-bottom: 20px;
        }
        p {
            color: #555;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .pdf-icon {
            font-size: 60px;
            color: #dc3545;
            margin-bottom: 20px;
        }
        .button {
            background-color: #1e3a8a;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #152a60;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="pdf-icon">
            <i class="fas fa-file-pdf"></i>
        </div>
        <h1>${title}</h1>
        <p>This is a placeholder for a PDF document that will be uploaded soon. The actual PDF will contain detailed information about ${title.toLowerCase()}.</p>
        <p>Please check back later for the complete document, or contact the college administration for more information.</p>
        <a href="javascript:history.back()" class="button">Go Back</a>
    </div>
</body>
</html>
`;

// Map of PDF filenames to their titles
const titleMap = {
  'grievance-redressal.pdf': 'Grievance Redressal',
  'anti-ragging-policy.pdf': 'Anti-Ragging Policy',
  'women-gender-cell.pdf': 'Women & Gender Cell',
  'sc-st-cell.pdf': 'SC-ST Cell',
  'syllabus.pdf': 'Academic Syllabus',
  'academic-calendar.pdf': 'Academic Calendar',
  'results.pdf': 'Examination Results',
  'nss-information.pdf': 'National Service Scheme',
  'ncc-information.pdf': 'National Cadet Corps'
};

// Ensure the pdfs directory exists
const pdfsDir = path.join(__dirname, '../public/pdfs');
console.log('PDF directory path:', pdfsDir);

if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
  console.log('Created pdfs directory');
}

// Create placeholder files
pdfFiles.forEach(pdfFile => {
  const title = titleMap[pdfFile] || 'PDF Document';
  const htmlContent = createPlaceholderHTML(title);
  
  // Write the HTML file
  const htmlPath = path.join(pdfsDir, pdfFile.replace('.pdf', '.html'));
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`Created placeholder: ${htmlPath}`);
});

console.log('All placeholder files created successfully!'); 