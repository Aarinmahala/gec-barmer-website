@echo off
echo ===== ANNOUNCEMENT UPDATER =====
echo This script will update the announcements on the website.
echo.

rem Run the update script
node scripts/update-announcements.js

echo.
echo Press any key to exit...
pause > nul 