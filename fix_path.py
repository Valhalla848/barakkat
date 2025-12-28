#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import paramiko
import sys
import io

if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

SERVER_IP = "84.247.168.237"
SERVER_USER = "root"
PASSWORD = "n5qtmQX8Q2"
REMOTE_DIR = "/var/www/autstaf2"
PORT = 3002

print("Checking directory structure...")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(SERVER_IP, username=SERVER_USER, password=PASSWORD, timeout=30)
    print("Connected!")
    
    # Check directory structure
    print("\n=== Directory structure ===")
    stdin, stdout, stderr = ssh.exec_command(f"ls -la {REMOTE_DIR}")
    print(stdout.read().decode())
    
    print("\n=== Looking for index.html ===")
    stdin, stdout, stderr = ssh.exec_command(f"find {REMOTE_DIR} -name 'index.html' -type f")
    index_files = stdout.read().decode()
    print(index_files if index_files else "index.html not found!")
    
    print("\n=== Full directory tree ===")
    stdin, stdout, stderr = ssh.exec_command(f"find {REMOTE_DIR} -type f | head -20")
    print(stdout.read().decode())
    
    # Check if dist folder exists
    print("\n=== Checking dist folder ===")
    stdin, stdout, stderr = ssh.exec_command(f"ls -la {REMOTE_DIR}/dist 2>&1")
    dist_output = stdout.read().decode()
    print(dist_output)
    
    # If dist doesn't exist, check if files are in root
    if "No such file" in dist_output or "cannot access" in dist_output:
        print("\nDist folder not found! Checking if files are in root...")
        stdin, stdout, stderr = ssh.exec_command(f"ls -la {REMOTE_DIR}/*.html 2>&1")
        print(stdout.read().decode())
        
        # Update server.js to use correct path
        print("\n=== Updating server.js to use correct path ===")
        server_js_content = """import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files - check both dist and root
const staticPaths = [
  path.join(__dirname, 'dist'),
  __dirname
];

// Try to find index.html
import { existsSync } from 'fs';
let staticPath = staticPaths.find(p => existsSync(path.join(p, 'index.html')));

if (!staticPath) {
  staticPath = __dirname; // Fallback to root
  console.warn('Warning: dist folder not found, serving from root');
}

console.log(`Serving static files from: ${staticPath}`);

app.use(express.static(staticPath));

// For SPA - all routes return index.html
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  console.log(`Serving index.html from: ${indexPath}`);
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log(`Static files directory: ${staticPath}`);
});
"""
    else:
        # dist exists, use it
        server_js_content = """import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files from dist folder
const staticPath = path.join(__dirname, 'dist');
console.log(`Serving static files from: ${staticPath}`);

app.use(express.static(staticPath));

// For SPA - all routes return index.html
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
"""
    
    # Upload fixed server.js
    sftp = ssh.open_sftp()
    remote_file = sftp.file(f"{REMOTE_DIR}/server.js", "w")
    remote_file.write(server_js_content)
    remote_file.close()
    sftp.close()
    print("Updated server.js!")
    
    # Restart PM2
    print("\nRestarting PM2...")
    stdin, stdout, stderr = ssh.exec_command(f"cd {REMOTE_DIR} && pm2 restart autstaf2")
    print(stdout.read().decode())
    
    # Check logs
    import time
    time.sleep(2)
    
    print("\n=== PM2 Logs ===")
    stdin, stdout, stderr = ssh.exec_command("pm2 logs autstaf2 --lines 15 --nostream")
    print(stdout.read().decode())
    
    ssh.close()
    print("\nDone! Check the logs above to see the static path being used.")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

