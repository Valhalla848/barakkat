$ErrorActionPreference = "Continue"
$ServerIP = "84.247.168.237"
$ServerUser = "root"
$RemoteDir = "/var/www/autstaf2"
$ServerPort = "3002"
$Password = "n5qtmQX8Q2"

Write-Host "Uploading files..." -ForegroundColor Yellow

# Upload dist folder
$distPath = Resolve-Path "dist"
Write-Host "Uploading dist folder..." -ForegroundColor Cyan
$result = & cmd /c "echo y | plink -ssh -pw $Password $ServerUser@$ServerIP `"mkdir -p $RemoteDir`"" 2>&1
if ($LASTEXITCODE -ne 0) {
    # Try with ssh
    ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $ServerUser@$ServerIP "mkdir -p $RemoteDir"
}

# Upload files using pscp (PuTTY) if available
$pscpPath = "$env:ProgramFiles\PuTTY\pscp.exe"
if (Test-Path $pscpPath) {
    Write-Host "Using PSCP to upload files..." -ForegroundColor Cyan
    & $pscpPath -pw $Password -r "$distPath\*" "${ServerUser}@${ServerIP}:${RemoteDir}/"
    & $pscpPath -pw $Password "package.json" "${ServerUser}@${ServerIP}:${RemoteDir}/"
    & $pscpPath -pw $Password "server.js" "${ServerUser}@${ServerIP}:${RemoteDir}/"
} else {
    Write-Host "PSCP not found. Trying SSH with password..." -ForegroundColor Yellow
    # Try alternative method
    Write-Host "Please run deploy.bat manually" -ForegroundColor Red
    exit 1
}

Write-Host "Setting up server..." -ForegroundColor Yellow
$setupScript = @"
cd $RemoteDir
npm install express --save
pm2 stop autstaf2 2>/dev/null || true
pm2 delete autstaf2 2>/dev/null || true
PORT=$ServerPort pm2 start server.js --name autstaf2
pm2 save
pm2 list
"@

if (Test-Path $pscpPath) {
    $plinkPath = "$env:ProgramFiles\PuTTY\plink.exe"
    $setupScript | & $plinkPath -ssh -pw $Password $ServerUser@$ServerIP
} else {
    ssh $ServerUser@$ServerIP $setupScript
}

Write-Host "Deployment complete! Site: http://${ServerIP}:${ServerPort}" -ForegroundColor Green

