@echo off
chcp 65001 >nul
echo Сборка и деплой проекта...
echo.

call npm run build
if %errorlevel% neq 0 (
    echo ОШИБКА: Сборка не удалась!
    pause
    exit /b 1
)

python deploy_auto.py
if %errorlevel% neq 0 (
    echo ОШИБКА: Деплой не удался!
    pause
    exit /b 1
)

echo.
echo Готово! Сайт обновлен.
pause

