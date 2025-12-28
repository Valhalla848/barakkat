# PowerShell скрипт для деплоя на Windows

$SERVER_IP = "84.247.168.237"
$SERVER_USER = "root"
$SERVER_PORT = "3002"
$REMOTE_DIR = "/var/www/autstaf2"
$SERVER_FILE = "server.js"

Write-Host "🚀 Начинаем деплой на сервер..." -ForegroundColor Green

# Собираем проект
Write-Host "📦 Собираем проект..." -ForegroundColor Yellow
npm run build

# Загружаем файлы на сервер через SCP (нужен OpenSSH)
Write-Host "📤 Загружаем файлы на сервер..." -ForegroundColor Yellow

# Создаём директорию на сервере
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ${REMOTE_DIR}"

# Загружаем dist папку
scp -r dist/* ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/

# Загружаем package.json и server.js
scp package.json ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/
scp ${SERVER_FILE} ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/

# Устанавливаем зависимости и запускаем сервер
Write-Host "⚙️  Настраиваем сервер..." -ForegroundColor Yellow
ssh ${SERVER_USER}@${SERVER_IP} @"
cd ${REMOTE_DIR}
npm install express --save
pm2 stop autstaf2 2>`$null
pm2 delete autstaf2 2>`$null
`$env:PORT='${SERVER_PORT}'; pm2 start ${SERVER_FILE} --name autstaf2
pm2 save
"@

Write-Host "✅ Деплой завершён! Сайт доступен на http://${SERVER_IP}:${SERVER_PORT}" -ForegroundColor Green

