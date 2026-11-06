# Making Admin Panel Changes Permanent

This directory contains scripts that enable the admin panel changes to be saved permanently to the codebase.

## How It Works

The website operates in two modes:

1. **Development/Testing Mode (Default)**: Changes made in the admin panel are stored in the browser's localStorage. These changes persist only in that browser and are not saved to the actual code files.

2. **Permanent Storage Mode**: Using the "Make Changes Permanent" functionality, admin panel changes can be directly written to the source code files, making them permanent across all deployments.

## Setting Up the Server

To enable the permanent storage functionality, you need to run the server component alongside the React application:

```bash
# Install dependencies first (if not already done)
npm install

# Run both the React app and the server
npm run dev
```

This will start:
- The React application on port 3000
- The admin server on port 3001

## How to Use

### Option 1: Using the Admin Panel

1. Make changes using the various admin panel tools (Image Manager, Announcements, Links, Leadership, etc.)
2. Go to the "Make Changes Permanent" section (or use the Export Manager)
3. Click the "Save All Changes to Codebase" button
4. The server will update the source files directly

### Option 2: Manual Export/Import

If the server component is not available:

1. Use the "Export" feature to download JavaScript files
2. Replace the corresponding files in the `src/utils` directory manually
3. Rebuild the application

## Server API

The server exposes a REST API endpoint:

- **POST /api/update-source**
  - Updates source files directly
  - Body: `{ dataType: 'imageLinks'|'announcements'|'links'|'leadership'|'all', data: {...} }`
  - Returns: `{ success: true|false, message: '...' }`

## Scripts Overview

- **server.js**: Express server that handles API requests
- **update-source.js**: Node.js script that updates source code files

## Troubleshooting

If you encounter issues with the direct update method:

1. Check that both the React app and the server are running
2. Ensure the server has proper file permissions to modify the source files
3. Check the server logs for error messages
4. As a fallback, use the manual export/import method

## Security Considerations

This functionality is designed for development and trusted admin environments. In production:

- Ensure the server is protected behind proper authentication
- Consider implementing additional validation for the incoming data
- Restrict file write permissions to only the necessary files

For any questions or issues, please contact the development team.