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

# Read local server.js
print("Reading local server.js...")
with open("server.js", "r", encoding="utf-8") as f:
    server_js_content = f.read()

print("Connecting to server...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(SERVER_IP, username=SERVER_USER, password=PASSWORD, timeout=30)
    print("Connected!")
    
    # Upload server.js
    print("Uploading server.js...")
    sftp = ssh.open_sftp()
    remote_file = sftp.file(f"{REMOTE_DIR}/server.js", "w")
    remote_file.write(server_js_content)
    remote_file.close()
    sftp.close()
    print("OK: server.js uploaded!")
    
    # Restart PM2
    print("Restarting PM2...")
    stdin, stdout, stderr = ssh.exec_command(f"cd {REMOTE_DIR} && pm2 restart autstaf2")
    output = stdout.read().decode()
    errors = stderr.read().decode()
    print(output)
    if errors:
        print("Errors:", errors)
    
    # Wait a bit
    import time
    time.sleep(2)
    
    # Check status
    print("\n=== PM2 Status ===")
    stdin, stdout, stderr = ssh.exec_command("pm2 list")
    print(stdout.read().decode())
    
    # Check port
    print("\n=== Port 3002 ===")
    stdin, stdout, stderr = ssh.exec_command("ss -tlnp | grep 3002")
    port_output = stdout.read().decode()
    if port_output:
        print(f"Port 3002 is listening:")
        print(port_output)
    else:
        print("Port 3002 is NOT listening!")
    
    # Check logs
    print("\n=== Latest Logs ===")
    stdin, stdout, stderr = ssh.exec_command("pm2 logs autstaf2 --lines 10 --nostream")
    print(stdout.read().decode())
    
    ssh.close()
    print("\nDone!")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

