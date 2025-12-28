#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import paramiko
import os
import subprocess
import sys

# Fix encoding for Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

SERVER_IP = "84.247.168.237"
SERVER_USER = "root"
PASSWORD = "n5qtmQX8Q2"
REMOTE_DIR = "/var/www/autstaf2"
PORT = 3002

def upload_directory(sftp, local_dir, remote_dir):
    """Upload directory recursively"""
    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        remote_path = remote_dir + "/" + item
        
        if os.path.isfile(local_path):
            print(f"Uploading {local_path} -> {remote_path}")
            sftp.put(local_path, remote_path)
        elif os.path.isdir(local_path):
            try:
                sftp.mkdir(remote_path)
            except IOError:
                pass
            upload_directory(sftp, local_path, remote_path)

def main():
    print("Starting deployment...")
    
    # Always build project to ensure latest changes are included
    print("\nBuilding project...")
    try:
        # Use npm.cmd on Windows, npm on Unix
        npm_cmd = "npm.cmd" if sys.platform == 'win32' else "npm"
        result = subprocess.run([npm_cmd, "run", "build"], capture_output=True, text=True, shell=(sys.platform == 'win32'))
        if result.returncode != 0:
            print("ERROR: Build failed!")
            print(result.stdout)
            print(result.stderr)
            sys.exit(1)
        print("OK: Build successful!")
    except FileNotFoundError:
        print("ERROR: npm not found. Please install Node.js and npm.")
        sys.exit(1)
    
    # Connect to server
    print(f"\nConnecting to {SERVER_USER}@{SERVER_IP}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(SERVER_IP, username=SERVER_USER, password=PASSWORD, timeout=30)
        print("OK: Connected!")
    except Exception as e:
        print(f"ERROR: Connection failed: {e}")
        sys.exit(1)
    
    # Create remote directory
    print(f"\nCreating directory {REMOTE_DIR}...")
    stdin, stdout, stderr = ssh.exec_command(f"mkdir -p {REMOTE_DIR}")
    stdout.channel.recv_exit_status()
    
    # Upload files
    print("\nUploading files...")
    sftp = ssh.open_sftp()
    
    try:
        # Upload dist folder
        upload_directory(sftp, "dist", REMOTE_DIR)
        
        # Upload package.json and server.js
        print(f"Uploading package.json -> {REMOTE_DIR}/package.json")
        sftp.put("package.json", f"{REMOTE_DIR}/package.json")
        
        print(f"Uploading server.js -> {REMOTE_DIR}/server.js")
        sftp.put("server.js", f"{REMOTE_DIR}/server.js")
        
        print("OK: Files uploaded!")
    finally:
        sftp.close()
    
    # Setup and start server
    print("\nSetting up server...")
    commands = f"""
cd {REMOTE_DIR}
npm install express --save
pm2 stop autstaf2 2>/dev/null || true
pm2 delete autstaf2 2>/dev/null || true
PORT={PORT} pm2 start server.js --name autstaf2
pm2 save
pm2 list
"""
    
    stdin, stdout, stderr = ssh.exec_command(commands)
    output = stdout.read().decode()
    errors = stderr.read().decode()
    
    print(output)
    if errors:
        print("Errors:", errors)
    
    ssh.close()
    
    print(f"\nOK: Deployment complete!")
    print(f"Site available at: http://{SERVER_IP}:{PORT}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nERROR: Deployment cancelled!")
        sys.exit(1)

