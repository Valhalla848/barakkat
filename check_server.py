#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import paramiko
import sys
import io

# Fix encoding for Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

SERVER_IP = "84.247.168.237"
SERVER_USER = "root"
PASSWORD = "n5qtmQX8Q2"
REMOTE_DIR = "/var/www/autstaf2"
PORT = 3002

print("Checking server status...")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(SERVER_IP, username=SERVER_USER, password=PASSWORD, timeout=30)
    print("Connected to server\n")
    
    # Check PM2 status
    print("=== PM2 Status ===")
    stdin, stdout, stderr = ssh.exec_command("pm2 list")
    print(stdout.read().decode())
    
    # Check PM2 logs
    print("\n=== PM2 Logs (last 50 lines) ===")
    stdin, stdout, stderr = ssh.exec_command("pm2 logs autstaf2 --lines 50 --nostream")
    output = stdout.read().decode()
    errors = stderr.read().decode()
    print(output)
    if errors:
        print("Errors:", errors)
    
    # Check if port is listening
    print("\n=== Port 3002 Status ===")
    stdin, stdout, stderr = ssh.exec_command(f"netstat -tlnp | grep {PORT} || ss -tlnp | grep {PORT}")
    port_output = stdout.read().decode()
    if port_output:
        print(port_output)
    else:
        print(f"Port {PORT} is NOT listening!")
    
    # Check firewall
    print("\n=== Firewall Status ===")
    stdin, stdout, stderr = ssh.exec_command("ufw status 2>/dev/null || firewall-cmd --list-ports 2>/dev/null || iptables -L -n | grep 3002 || echo 'Firewall check failed'")
    print(stdout.read().decode())
    
    # Check server.js file
    print("\n=== Server.js Content ===")
    stdin, stdout, stderr = ssh.exec_command(f"cat {REMOTE_DIR}/server.js")
    print(stdout.read().decode())
    
    # Check if process is running
    print("\n=== Process Check ===")
    stdin, stdout, stderr = ssh.exec_command("ps aux | grep 'node.*server.js' | grep -v grep")
    print(stdout.read().decode())
    
    ssh.close()
    
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)

