@echo off
echo 🚀 CONFIGURANDO PROYECTO ANDROID NATIVO
echo ========================================

echo 📋 Verificando requisitos...

REM Verificar Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java no encontrado. Instala JDK 8+ y configura JAVA_HOME
    pause
    exit /b 1
)
echo ✅ Java encontrado

REM Verificar Android SDK
if not defined ANDROID_HOME (
    echo ❌ ANDROID_HOME no configurado
    echo Configurando ANDROID_HOME...
    set ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk
    set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
)
echo ✅ Android SDK configurado

REM Crear local.properties
echo 📝 Creando local.properties...
echo sdk.dir=%ANDROID_HOME% > local.properties
echo ✅ local.properties creado

REM Crear gradle wrapper
echo 📦 Configurando Gradle Wrapper...
if not exist gradle\wrapper mkdir gradle\wrapper

REM Crear gradle-wrapper.properties
echo distributionBase=GRADLE_USER_HOME > gradle\wrapper\gradle-wrapper.properties
echo distributionPath=wrapper/dists >> gradle\wrapper\gradle-wrapper.properties
echo distributionUrl=https\://services.gradle.org/distributions/gradle-7.6-bin.zip >> gradle\wrapper\gradle-wrapper.properties
echo zipStoreBase=GRADLE_USER_HOME >> gradle\wrapper\gradle-wrapper.properties
echo zipStorePath=wrapper/dists >> gradle\wrapper\gradle-wrapper.properties

echo ✅ Gradle Wrapper configurado

echo.
echo 🎯 CONFIGURACIÓN COMPLETADA
echo ===========================
echo.
echo 📱 Próximos pasos:
echo 1. Ejecutar: build_apk.bat
echo 2. Instalar APK en dispositivo
echo 3. ¡Disfrutar del juego!
echo.
echo 🔧 Configuración:
echo - Java: %JAVA_HOME%
echo - Android SDK: %ANDROID_HOME%
echo - Gradle: 7.6
echo.
pause
