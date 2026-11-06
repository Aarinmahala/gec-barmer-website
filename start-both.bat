@echo off
echo Starting College Website Application...

REM Start the API server in a new command window
start cmd /k "cd /d %~dp0 && node scripts/server.js"

REM Wait a bit for the server to start
timeout /t 2 /nobreak > nul

REM Start the React app in this window
echo Starting React app...
cd /d %~dp0
npm run start 