@echo off
echo ===== COLLEGE WEBSITE APPLICATION STARTER =====
echo Working directory: %CD%

echo Starting API server on port 3001...
start cmd /k "cd %CD% && npm run server"

echo Waiting for server to start...
timeout /t 5

echo Starting React development server on port 3000...
start cmd /k "cd %CD% && npm start"

echo ===== SERVERS STARTED =====
echo API Server: http://localhost:3001
echo React App: http://localhost:3000
echo Admin Login: http://localhost:3000/admin/login
echo Faculty Manager: http://localhost:3000/admin/faculty
echo To stop the servers, close their respective windows.
pause 