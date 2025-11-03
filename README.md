# 📱 Rincones del Mundo - Android

## 🚀 **COMPILACIÓN RÁPIDA**

### **Windows:**
```bash
# 1. Configurar local.properties
copy local.properties.template local.properties
# Editar local.properties con tu ruta del Android SDK

# 2. Compilar
build.bat
```

### **Linux/Mac:**
```bash
# 1. Configurar local.properties
cp local.properties.template local.properties
# Editar local.properties con tu ruta del Android SDK

# 2. Compilar
./gradlew assembleDebug
```

---

## 🔧 **CONFIGURACIÓN REQUERIDA**

### **1. Android SDK:**
- **API Level:** 24 (Android 7.0) mínimo
- **Target API:** 34 (Android 14)
- **JDK:** 17

### **2. Firebase (Opcional para testing):**
- Colocar `google-services.json` real en `app/`
- Actualizar `default_web_client_id` en `strings.xml`

### **3. Permisos:**
- ✅ Internet
- ✅ Network State

---

## 📁 **ESTRUCTURA DEL PROYECTO**

```
android/
├── app/
│   ├── src/main/
│   │   ├── assets/          # Juego web completo
│   │   ├── java/com/rinconesdelmundo/
│   │   │   ├── MainActivity.java
│   │   │   ├── LoginActivity.java
│   │   │   ├── NickSetupActivity.java
│   │   │   ├── RankingActivity.java
│   │   │   ├── GameBridge.java
│   │   │   └── RankingAdapter.java
│   │   ├── res/             # Recursos Android
│   │   └── AndroidManifest.xml
│   ├── build.gradle
│   └── google-services.json
├── build.gradle
├── settings.gradle
├── gradle.properties
└── build.bat
```

---

## 🎮 **FUNCIONALIDADES**

### **Implementadas:**
- ✅ **WebView** con juego completo
- ✅ **GameBridge** para comunicación JavaScript ↔ Android
- ✅ **Google Sign-In** (configuración lista)
- ✅ **Firebase Firestore** (configuración lista)
- ✅ **Ranking** con top 20 usuarios
- ✅ **Nick único** por usuario
- ✅ **Sincronización** de puzzles completados

### **Métodos GameBridge:**
- `openRanking()` - Abrir ranking
- `getTop20()` - Obtener top 20
- `addPuzzles(delta)` - Sumar puzzles
- `getUser()` - Datos del usuario
- `setNick(nick)` - Configurar nick

---

## 🧪 **TESTING**

### **1. Compilar:**
```bash
./gradlew assembleDebug
```

### **2. Instalar:**
```bash
./gradlew installDebug
```

### **3. Verificar:**
- ✅ App se abre
- ✅ WebView carga juego
- ✅ No hay errores en logcat

---

## 🔥 **FIREBASE SETUP**

Ver `FIREBASE_SETUP.md` para configuración completa.

### **Pasos rápidos:**
1. Crear proyecto en Firebase Console
2. Añadir app Android con package `com.rinconesdelmundo`
3. Descargar `google-services.json` → `app/`
4. Configurar Authentication (Google)
5. Configurar Firestore con reglas de seguridad
6. Actualizar `default_web_client_id` en `strings.xml`

---

## 🚨 **PROBLEMAS COMUNES**

### **Error: "SDK location not found"**
- Crear `local.properties` con ruta del Android SDK
- Ejemplo: `sdk.dir=C:\\Users\\TuUsuario\\AppData\\Local\\Android\\Sdk`

### **Error: "Google Sign-In failed"**
- Verificar `google-services.json` en `app/`
- Verificar `default_web_client_id` en `strings.xml`
- Verificar SHA-1 en Firebase Console

### **Error: "WebView not loading"**
- Verificar que assets estén en `app/src/main/assets/`
- Verificar permisos de Internet en `AndroidManifest.xml`

---

## 📞 **CONTACTO**

**Desarrollador:** Neni  
**Fecha:** 22/10/2025  
**Versión:** 1.0  
**Estado:** FASE 3 - Implementación

