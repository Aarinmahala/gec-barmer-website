const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Determine if we're on Windows
const isWindows = os.platform() === 'win32';

// Commands to run
const commands = [
  {
    name: 'React App',
    cmd: isWindows ? 'npm.cmd' : 'npm',
    args: ['run', 'start'],
    options: { cwd: path.join(__dirname, '..') }
  },
  {
    name: 'API Server',
    cmd: isWindows ? 'npm.cmd' : 'npm',
    args: ['run', 'server'],
    options: { cwd: path.join(__dirname, '..') }
  }
];

// Function to start a process
function startProcess(processConfig) {
  const { name, cmd, args, options } = processConfig;
  
  console.log(`Starting ${name}...`);
  
  const process = spawn(cmd, args, {
    ...options,
    stdio: 'pipe'
  });
  
  // Handle process output
  process.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });
  
  process.stderr.on('data', (data) => {
    console.error(`[${name} ERROR] ${data.toString().trim()}`);
  });
  
  // Handle process exit
  process.on('close', (code) => {
    if (code !== 0) {
      console.log(`[${name}] Process exited with code ${code}`);
    }
  });
  
  return process;
}

// Start all processes
const processes = commands.map(startProcess);

// Handle graceful shutdown
function cleanup() {
  console.log('Shutting down all processes...');
  processes.forEach((process) => {
    if (!process.killed) {
      process.kill();
    }
  });
}

// Handle termination signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

console.log('All processes started. Press Ctrl+C to stop all.'); 