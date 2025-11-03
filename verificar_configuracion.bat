@echo off
echo ========================================
echo    VERIFICAR CONFIGURACIÓN FIREBASE
echo ========================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist "app\build.gradle" (
    echo ❌ Error: No se encuentra app\build.gradle
    echo Asegurate de ejecutar este script desde la carpeta android\
    pause
    exit /b 1
)

echo ✅ Directorio correcto encontrado
echo.

echo 🔍 Verificando configuración Firebase...
echo.

REM Verificar google-services.json
if exist "app\google-services.json" (
    echo ✅ google-services.json encontrado
    
    REM Verificar que no es el template
    findstr /C:"123456789-abcdefghijklmnop.apps.googleusercontent.com" "app\google-services.json" >nul
    if %ERRORLEVEL% equ 0 (
        echo ⚠️  Advertencia: google-services.json parece ser template
        echo    Necesitas reemplazarlo con el archivo real de Firebase Console
    ) else (
        echo ✅ google-services.json parece ser real (no template)
    )
) else (
    echo ❌ google-services.json no encontrado
    echo    Necesitas descargarlo de Firebase Console
)

echo.

REM Verificar strings.xml
if exist "app\src\main\res\values\strings.xml" (
    echo ✅ strings.xml encontrado
    
    REM Verificar default_web_client_id
    findstr /C:"REEMPLAZAR_CON_WEB_CLIENT_ID_REAL" "app\src\main\res\values\strings.xml" >nul
    if %ERRORLEVEL% equ 0 (
        echo ❌ default_web_client_id no configurado
        echo    Necesitas reemplazarlo con el Web Client ID real
    ) else (
        echo ✅ default_web_client_id configurado
    )
) else (
    echo ❌ strings.xml no encontrado
)

echo.

REM Verificar archivos Java
if exist "app\src\main\java\com\rinconesdelmundo\GameBridge.java" (
    echo ✅ GameBridge.java encontrado
) else (
    echo ❌ GameBridge.java no encontrado
)

if exist "app\src\main\java\com\rinconesdelmundo\LoginActivity.java" (
    echo ✅ LoginActivity.java encontrado
) else (
    echo ❌ LoginActivity.java no encontrado
)

if exist "app\src\main\java\com\rinconesdelmundo\RankingActivity.java" (
    echo ✅ RankingActivity.java encontrado
) else (
    echo ❌ RankingActivity.java no encontrado
)

echo.

REM Verificar assets
if exist "app\src\main\assets\index.html" (
    echo ✅ index.html encontrado
) else (
    echo ❌ index.html no encontrado
)

if exist "app\src\main\assets\js\firebase-integration.js" (
    echo ✅ firebase-integration.js encontrado
) else (
    echo ❌ firebase-integration.js no encontrado
)

echo.
echo ========================================
echo    RESUMEN DE CONFIGURACIÓN
echo ========================================
echo.

echo 📋 ESTADO ACTUAL:
echo.

REM Verificar configuración completa
set CONFIG_OK=1

if not exist "app\google-services.json" (
    echo ❌ google-services.json: FALTANTE
    set CONFIG_OK=0
) else (
    findstr /C:"123456789-abcdefghijklmnop.apps.googleusercontent.com" "app\google-services.json" >nul
    if %ERRORLEVEL% equ 0 (
        echo ⚠️  google-services.json: TEMPLATE (necesita reemplazo)
        set CONFIG_OK=0
    ) else (
        echo ✅ google-services.json: CONFIGURADO
    )
)

findstr /C:"REEMPLAZAR_CON_WEB_CLIENT_ID_REAL" "app\src\main\res\values\strings.xml" >nul
if %ERRORLEVEL% equ 0 (
    echo ❌ default_web_client_id: NO CONFIGURADO
    set CONFIG_OK=0
) else (
    echo ✅ default_web_client_id: CONFIGURADO
)

echo.

if %CONFIG_OK% equ 1 (
    echo 🎉 CONFIGURACIÓN COMPLETA
    echo.
    echo ✅ La app está lista para compilar y probar
    echo.
    echo 🚀 PRÓXIMOS PASOS:
    echo    1. Compilar: build_final.bat
    echo    2. Instalar: gradlew.bat installDebug
    echo    3. Probar funcionalidades
    echo.
) else (
    echo ⚠️  CONFIGURACIÓN INCOMPLETA
    echo.
    echo 📋 PASOS FALTANTES:
    echo.
    
    if not exist "app\google-services.json" (
        echo    1. Descargar google-services.json de Firebase Console
        echo       - Crear proyecto Firebase
        echo       - Añadir app Android con package com.rinconesdelmundo
        echo       - Añadir SHA-1 (usar get_sha1.bat)
        echo       - Descargar google-services.json
        echo.
    ) else (
        findstr /C:"123456789-abcdefghijklmnop.apps.googleusercontent.com" "app\google-services.json" >nul
        if %ERRORLEVEL% equ 0 (
            echo    1. Reemplazar google-services.json template con el real
            echo.
        )
    )
    
    findstr /C:"REEMPLAZAR_CON_WEB_CLIENT_ID_REAL" "app\src\main\res\values\strings.xml" >nul
    if %ERRORLEVEL% equ 0 (
        echo    2. Configurar default_web_client_id en strings.xml
        echo       - Obtener Web Client ID de Google Cloud Console
        echo       - Reemplazar en app/src/main/res/values/strings.xml
        echo.
    )
    
    echo 📖 Ver guía completa: CONFIGURACION_FIREBASE_COMPLETA.md
    echo.
)

echo ========================================
echo    VERIFICACIÓN COMPLETADA
echo ========================================
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

