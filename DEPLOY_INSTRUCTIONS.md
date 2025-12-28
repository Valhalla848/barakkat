# Инструкция по деплою сайта

## Самый быстрый способ (для Windows)

Просто дважды кликните на файл:
- **`deploy.bat`** - полный деплой с подробным выводом
- **`build_and_deploy.bat`** - быстрый деплой

Или запустите в командной строке:
```cmd
deploy.bat
```

## Автоматический способ (Python скрипт)

Запустите скрипт:

```bash
python deploy_auto.py
```

Скрипт автоматически:
1. Соберет проект (`npm run build`) - **всегда собирает заново**
2. Подключится к серверу
3. Загрузит все файлы
4. Перезапустит сервер

---

## Ручной способ (пошагово)

### Шаг 1: Соберите проект

```bash
npm run build
```

Это создаст папку `dist` с готовыми файлами для продакшена.

### Шаг 2: Подключитесь к серверу

```bash
ssh root@84.247.168.237
```

Пароль: `n5qtmQX8Q2`

### Шаг 3: Загрузите файлы на сервер

**Вариант A: Через SCP (из PowerShell/CMD)**

```bash
# Загрузить всю папку dist
scp -r dist/* root@84.247.168.237:/var/www/autstaf2/

# Загрузить server.js и package.json
scp server.js root@84.247.168.237:/var/www/autstaf2/
scp package.json root@84.247.168.237:/var/www/autstaf2/
```

**Вариант B: Через WinSCP или FileZilla**
- Хост: `84.247.168.237`
- Пользователь: `root`
- Пароль: `n5qtmQX8Q2`
- Путь: `/var/www/autstaf2/`

### Шаг 4: На сервере установите зависимости и перезапустите

После подключения к серверу выполните:

```bash
cd /var/www/autstaf2
npm install express --save
pm2 restart autstaf2
```

Или если процесс не запущен:

```bash
cd /var/www/autstaf2
npm install express --save
pm2 stop autstaf2 2>/dev/null || true
pm2 delete autstaf2 2>/dev/null || true
pm2 start server.js --name autstaf2
pm2 save
```

### Шаг 5: Проверьте статус

```bash
pm2 list
pm2 logs autstaf2 --lines 20
```

---

## Полезные команды PM2

```bash
# Посмотреть все процессы
pm2 list

# Посмотреть логи
pm2 logs autstaf2

# Перезапустить
pm2 restart autstaf2

# Остановить
pm2 stop autstaf2

# Удалить
pm2 delete autstaf2

# Сохранить список процессов (чтобы они запускались после перезагрузки)
pm2 save
```

---

## Структура проекта на сервере

```
/var/www/autstaf2/
├── index.html          # Главная страница
├── assets/             # CSS и JS файлы
├── *.svg, *.png        # Изображения
├── server.js           # Node.js сервер
├── package.json        # Зависимости
└── node_modules/       # Установленные пакеты
```

---

## Адрес сайта

После деплоя сайт доступен по адресу:
**http://84.247.168.237:3002**

---

## Требования

- Python 3 (для автоматического скрипта)
- Библиотека `paramiko` (установите через `pip install paramiko`)
- Node.js и npm (для сборки проекта)
- Доступ к серверу по SSH

---

## Устранение проблем

### Ошибка "ENOENT: no such file or directory"
- Убедитесь, что файлы загружены в `/var/www/autstaf2/`
- Проверьте, что `index.html` существует

### Ошибка "require is not defined"
- Убедитесь, что `package.json` содержит `"type": "module"`
- Проверьте, что `server.js` использует `import` вместо `require`

### Сайт не открывается
- Проверьте, что PM2 процесс запущен: `pm2 list`
- Проверьте логи: `pm2 logs autstaf2`
- Убедитесь, что порт 3002 открыт в брандмауэре

