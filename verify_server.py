#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import paramiko
import sys
import io
import time

if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

SERVER_IP = "84.247.168.237"
SERVER_USER = "root"
PASSWORD = "n5qtmQX8Q2"
REMOTE_DIR = "/var/www/autstaf2"

print("Verifying server...")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(SERVER_IP, username=SERVER_USER, password=PASSWORD, timeout=30)
    
    # Check latest logs
    print("\n=== Latest PM2 Logs ===")
    stdin, stdout, stderr = ssh.exec_command("pm2 logs autstaf2 --lines 5 --nostream")
    print(stdout.read().decode())
    
    # Check if index.html exists
    print("\n=== Verifying index.html ===")
    stdin, stdout, stderr = ssh.exec_command(f"test -f {REMOTE_DIR}/index.html && echo 'OK: index.html exists' || echo 'ERROR: index.html not found'")
    print(stdout.read().decode())
    
    # Check PM2 status
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
    
    # Test server response
    print("\n=== Testing server response ===")
    stdin, stdout, stderr = ssh.exec_command("curl -s -o /dev/null -w '%{http_code}' http://localhost:3002 || echo 'curl failed'")
    response = stdout.read().decode().strip()
    print(f"HTTP Response Code: {response}")
    
    if response == "200":
        print("SUCCESS! Server is responding correctly!")
    else:
        print(f"Warning: Server returned code {response}")
    
    ssh.close()
    print(f"\nSite should be available at: http://{SERVER_IP}:3002")
    
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)

