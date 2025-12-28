@echo off
chcp 65001 >nul
echo ====================================
echo   Деплой сайта на сервер
echo ====================================
echo.

echo [1/2] Сборка проекта...
call npm run build
if %errorlevel% neq 0 (
    echo ОШИБКА: Сборка не удалась!
    pause
    exit /b 1
)

echo.
echo [2/2] Загрузка на сервер...
python deploy_auto.py
if %errorlevel% neq 0 (
    echo ОШИБКА: Деплой не удался!
    pause
    exit /b 1
)

echo.
echo ====================================
echo   Деплой завершен успешно!
echo   Сайт: http://84.247.168.237:3002
echo ====================================
pause
