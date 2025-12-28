# Простой скрипт для деплоя на сервер
$SERVER_IP = "84.247.168.237"
$SERVER_USER = "root"
$SERVER_PORT = "3002"
$REMOTE_DIR = "/var/www/autstaf2"
$PASSWORD = "n5qtmQX8Q2"

Write-Host "🚀 Начинаем деплой на сервер..." -ForegroundColor Green

# Проверяем, собран ли проект
if (-not (Test-Path "dist")) {
    Write-Host "📦 Собираем проект..." -ForegroundColor Yellow
    npm run build
}

Write-Host "📤 Загружаем файлы на сервер..." -ForegroundColor Yellow

# Создаём архив для загрузки
$tempDir = "deploy-temp"
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir | Out-Null
Copy-Item -Recurse dist/* $tempDir/
Copy-Item package.json $tempDir/
Copy-Item server.js $tempDir/

# Используем ssh для создания директории
$sshCommand = "ssh ${SERVER_USER}@${SERVER_IP} 'mkdir -p ${REMOTE_DIR}'"
Write-Host "Создаём директорию на сервере..." -ForegroundColor Cyan
$sshCommand | cmd /c

# Загружаем файлы через scp (потребуется ввод пароля)
Write-Host "Загружаем файлы..." -ForegroundColor Cyan
Write-Host "Введите пароль, когда будет запрошено: $PASSWORD" -ForegroundColor Yellow

# Для автоматического ввода пароля используем sshpass (если установлен) или ручной ввод
$scpCommand = "scp -r ${tempDir}/* ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"
$scpCommand | cmd /c

# Настраиваем и запускаем сервер
Write-Host "⚙️  Настраиваем сервер..." -ForegroundColor Yellow
$setupScript = @"
cd ${REMOTE_DIR}
npm install express --save
pm2 stop autstaf2 2>/dev/null || true
pm2 delete autstaf2 2>/dev/null || true
PORT=${SERVER_PORT} pm2 start server.js --name autstaf2
pm2 save
"@

$setupScript | ssh ${SERVER_USER}@${SERVER_IP} bash

# Очищаем временные файлы
Remove-Item -Recurse -Force $tempDir

Write-Host "✅ Деплой завершён! Сайт доступен на http://${SERVER_IP}:${SERVER_PORT}" -ForegroundColor Green

