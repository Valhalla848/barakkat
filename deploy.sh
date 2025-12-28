#!/bin/bash

# Настройки сервера
SERVER_IP="84.247.168.237"
SERVER_USER="root"
SERVER_PORT="3002"
REMOTE_DIR="/var/www/autstaf2"
SERVER_FILE="server.js"

echo "🚀 Начинаем деплой на сервер..."

# Собираем проект
echo "📦 Собираем проект..."
npm run build

# Загружаем файлы на сервер
echo "📤 Загружаем файлы на сервер..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"
scp -r dist/* $SERVER_USER@$SERVER_IP:$REMOTE_DIR/
scp package.json $SERVER_USER@$SERVER_IP:$REMOTE_DIR/
scp $SERVER_FILE $SERVER_USER@$SERVER_IP:$REMOTE_DIR/

# Устанавливаем зависимости и запускаем сервер
echo "⚙️  Настраиваем сервер..."
ssh $SERVER_USER@$SERVER_IP << EOF
cd $REMOTE_DIR
npm install express --save
pm2 stop autstaf2 || true
pm2 delete autstaf2 || true
PORT=$SERVER_PORT pm2 start $SERVER_FILE --name autstaf2
pm2 save
EOF

echo "✅ Деплой завершён! Сайт доступен на http://$SERVER_IP:$SERVER_PORT"

