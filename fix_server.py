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

# New server.js with ES module syntax
server_js_content = """import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// For SPA - all routes return index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
"""

print("Fixing server.js...")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(SERVER_IP, username=SERVER_USER, password=PASSWORD, timeout=30)
    print("Connected!")
    
    # Upload fixed server.js
    sftp = ssh.open_sftp()
    remote_file = sftp.file(f"{REMOTE_DIR}/server.js", "w")
    remote_file.write(server_js_content)
    remote_file.close()
    sftp.close()
    print("Fixed server.js uploaded!")
    
    # Restart PM2
    print("Restarting PM2...")
    stdin, stdout, stderr = ssh.exec_command(f"cd {REMOTE_DIR} && pm2 restart autstaf2")
    print(stdout.read().decode())
    
    # Wait a bit and check status
    import time
    time.sleep(2)
    
    print("\nChecking PM2 status...")
    stdin, stdout, stderr = ssh.exec_command("pm2 list")
    print(stdout.read().decode())
    
    print("\nChecking logs...")
    stdin, stdout, stderr = ssh.exec_command("pm2 logs autstaf2 --lines 10 --nostream")
    print(stdout.read().decode())
    
    # Check port
    print("\nChecking port 3002...")
    stdin, stdout, stderr = ssh.exec_command(f"netstat -tlnp | grep {PORT} || ss -tlnp | grep {PORT}")
    port_output = stdout.read().decode()
    if port_output:
        print(f"Port {PORT} is listening!")
        print(port_output)
    else:
        print(f"Port {PORT} is still not listening. Check logs above.")
    
    ssh.close()
    print("\nDone! Try accessing: http://84.247.168.237:3002")
    
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)

