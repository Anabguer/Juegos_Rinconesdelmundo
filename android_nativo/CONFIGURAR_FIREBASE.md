# 🔥 Configuración Firebase - Rincones del Mundo

## ⚠️ IMPORTANTE: Debes completar estos pasos para que funcione el Login con Google

### 📝 Información de la App

**Package Name:** `com.intocables.rinconesdelmundo`  
**SHA-1 Debug:** `6D:F1:0E:F5:A5:09:76:8B:A3:ED:84:36:44:F5:24:D4:9E:E0:0C:0D`

---

## 🚀 Pasos para Configurar Firebase Console

### 1️⃣ Ir a Firebase Console
1. Abre https://console.firebase.google.com/
2. Selecciona el proyecto **"intocables13"**

### 2️⃣ Agregar/Verificar App Android
1. Ve a **Configuración del proyecto** (⚙️ arriba a la izquierda)
2. En la pestaña **"General"**, baja a **"Tus apps"**
3. Busca la app con package: `com.intocables.rinconesdelmundo`
4. Si NO existe:
   - Haz clic en **"Agregar app"** → **Android**
   - Package name: `com.intocables.rinconesdelmundo`
   - Apodo: `Rincones del Mundo`

### 3️⃣ **CRÍTICO** - Agregar Huella SHA-1
1. En la configuración de la app `com.intocables.rinconesdelmundo`
2. Ve a la sección **"Huellas de certificado SHA"**
3. Haz clic en **"Agregar huella digital"**
4. Pega: `6D:F1:0E:F5:A5:09:76:8B:A3:ED:84:36:44:F5:24:D4:9E:E0:0C:0D`
5. Haz clic en **"Guardar"**

### 4️⃣ Descargar google-services.json Actualizado
1. Después de agregar la huella SHA-1
2. Descarga el nuevo `google-services.json`
3. Reemplázalo en: `android_nativo/app/google-services.json`

### 5️⃣ Verificar en Google Cloud Console
1. Ve a https://console.cloud.google.com/
2. Selecciona el proyecto vinculado a Firebase
3. Ve a **APIs & Services** → **Credentials**
4. Verifica que exista un **"Android client"** para `com.intocables.rinconesdelmundo`
5. Si no existe, Firebase lo creará automáticamente al agregar la huella SHA-1

---

## ✅ Después de Configurar

1. Reemplaza el `google-services.json` con el nuevo descargado
2. Recompila la app: `.\build_and_install.bat`
3. El login con Google funcionará correctamente

---

## 🔍 Verificar que Funcionó

En la consola de la app deberías ver:
- ✅ `__onNativeLogin llamado con: {uid: ..., email: ..., hasNick: ...}`
- ✅ El botón se transforma en píldora con tu nick (si ya tienes cuenta)
- ✅ O muestra modal pidiendo nick (si es primera vez)

---

## ⚠️ Nota Importante

El `google-services.json` actual está configurado para múltiples apps del proyecto "intocables13".
**SOLO falta agregar la huella SHA-1 de debug** en Firebase Console para que funcione.

