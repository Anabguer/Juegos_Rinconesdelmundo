@echo off
setlocal
set HOST=82.194.68.83
set USER=sistema_apps_user
set PASS=GestionUploadSistemaApps!
set WINSCP="C:\Program Files (x86)\WinSCP\WinSCP.com"
set JUEGO=rincones_del_mundo
set LOCAL=%~dp0
set REMOTE=/sistema_apps_upload/rincones_del_mundo

echo DESPLEGANDO RINCONES DEL MUNDO A HOSTALIA
echo ===========================================
echo.
echo Local: %LOCAL%
echo Remote: %REMOTE%
echo WinSCP: %WINSCP%
echo URL: https://colisan.com/sistema_apps_upload/rincones_del_mundo/
echo.

echo Iniciando subida...
echo.

%WINSCP% /ini=nul /log:"%LOCAL%deploy_rincones_del_mundo.log" /command "open ftps://%USER%:%PASS%@%HOST%/ -explicit -certificate=*" "option batch on" "option confirm off" "lcd %LOCAL%" "mkdir rincones_del_mundo" "cd rincones_del_mundo" "put index.html" "put css" "put js" "put img" "put assets" "put api" "put data" "put PHPMailer" "exit"

echo.
echo Deploy completado
echo.
echo PROXIMOS PASOS:
echo 1. Ejecutar admin_db.php para configurar la base de datos
echo 2. Verificar que las imagenes de puzzles esten en la carpeta /puzzles/
echo 3. Probar el juego en: https://colisan.com/sistema_apps_upload/rincones_del_mundo/
echo.
echo Para verificar el deploy:
echo - Revisar el log: deploy_rincones_del_mundo.log
echo - Verificar archivos en el servidor
echo - Probar funcionalidad basica
echo.
pause