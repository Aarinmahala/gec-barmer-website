# PowerShell script to start both the React app and API server

Write-Host "Starting College Website Application..." -ForegroundColor Green

# Start the API server in a new PowerShell window
$serverCommand = "cd '$PSScriptRoot\..'; node .\scripts\server.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $serverCommand -WindowStyle Normal

# Wait a bit for the server to start
Start-Sleep -Seconds 2

# Start the React app in this window
Write-Host "Starting React app..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\.."
npm run start 