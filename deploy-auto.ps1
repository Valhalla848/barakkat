# Automatic deployment script
param(
    [string]$ServerIP = "84.247.168.237",
    [string]$ServerUser = "root",
    [string]$ServerPort = "3002",
    [string]$RemoteDir = "/var/www/autstaf2"
)

$ErrorActionPreference = "Stop"

Write-Host "Starting automatic deployment..." -ForegroundColor Green

# Step 1: Build project
Write-Host "`nBuilding project..." -ForegroundColor Yellow
if (-not (Test-Path "dist")) {
    npm run build
} else {
    $lastBuild = (Get-Item "dist").LastWriteTime
    $srcFiles = Get-ChildItem -Recurse -File src -ErrorAction SilentlyContinue
    if ($srcFiles) {
        $lastChange = ($srcFiles | Sort-Object LastWriteTime -Descending | Select-Object -First 1).LastWriteTime
        if ($lastChange -gt $lastBuild) {
            Write-Host "Changes detected, rebuilding project..." -ForegroundColor Cyan
            npm run build
        } else {
            Write-Host "Project already built, skipping build" -ForegroundColor Gray
        }
    } else {
        npm run build
    }
}

# Step 2: Prepare files for upload
Write-Host "`nPreparing files for upload..." -ForegroundColor Yellow
$tempDir = Join-Path $env:TEMP "autstaf2-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

Copy-Item -Recurse dist/* $tempDir/
Copy-Item package.json $tempDir/
Copy-Item server.js $tempDir/

Write-Host "Files prepared in: $tempDir" -ForegroundColor Gray

# Step 3: Upload files to server
Write-Host "`nUploading files to server..." -ForegroundColor Yellow
Write-Host "IP: $ServerIP" -ForegroundColor Gray
Write-Host "Directory: $RemoteDir" -ForegroundColor Gray
Write-Host "Port: $ServerPort" -ForegroundColor Gray

# Create directory on server
Write-Host "Creating directory on server..." -ForegroundColor Cyan
$createDirCmd = "ssh -o StrictHostKeyChecking=no ${ServerUser}@${ServerIP} `"mkdir -p ${RemoteDir}`""
Invoke-Expression $createDirCmd

# Upload files
Write-Host "Uploading files via SCP..." -ForegroundColor Cyan
$scpCmd = "scp -r `"${tempDir}\*`" ${ServerUser}@${ServerIP}:${RemoteDir}/"
try {
    Invoke-Expression $scpCmd
    Write-Host "Files uploaded successfully" -ForegroundColor Green
} catch {
    Write-Host "Error uploading files: $_" -ForegroundColor Red
    Write-Host "Try uploading manually:" -ForegroundColor Yellow
    Write-Host "scp -r `"${tempDir}\*`" ${ServerUser}@${ServerIP}:${RemoteDir}/" -ForegroundColor Gray
    exit 1
}

# Step 4: Setup and start server
Write-Host "`nSetting up and starting server..." -ForegroundColor Yellow

$setupScript = @"
cd ${RemoteDir}
echo 'Installing dependencies...'
npm install express --save --production
echo 'Stopping old process...'
pm2 stop autstaf2 2>/dev/null || true
pm2 delete autstaf2 2>/dev/null || true
echo 'Starting server on port ${ServerPort}...'
PORT=${ServerPort} pm2 start server.js --name autstaf2
pm2 save
echo 'Checking status...'
pm2 list
"@

$setupScript | ssh ${ServerUser}@${ServerIP} bash

# Cleanup temp files
Write-Host "`nCleaning up temporary files..." -ForegroundColor Yellow
Remove-Item -Recurse -Force $tempDir

Write-Host "`nDeployment completed successfully!" -ForegroundColor Green
Write-Host "Site is available at: http://${ServerIP}:${ServerPort}" -ForegroundColor Cyan
Write-Host "`nTo check server status run:" -ForegroundColor Gray
Write-Host "ssh ${ServerUser}@${ServerIP} 'pm2 logs autstaf2'" -ForegroundColor Gray
