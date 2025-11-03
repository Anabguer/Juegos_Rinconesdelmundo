package com.intocables.rinconesdelmundo;

import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.content.Intent;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.Map;
import java.io.IOException;
import java.io.InputStream;

public class GameBridge {
    
    private static final String APP_ID = "rinconesdelmundo";
    private MainActivity activity;
    private WebView webView;
    private FirebaseAuth mAuth;
    private FirebaseFirestore db;
    private String currentUserUid = null;

    public GameBridge(MainActivity activity) {
        this.activity = activity;
        this.webView = activity.findViewById(R.id.webView);
        this.mAuth = FirebaseAuth.getInstance();
        this.db = FirebaseFirestore.getInstance();
    }

    @JavascriptInterface
    public void openRanking() {
        activity.runOnUiThread(() -> {
            // Verificar si usuario está logueado
            if (!isUserLoggedIn()) {
                // Usuario no logueado, iniciar login
                activity.showLoginActivity();
            } else {
                // Usuario logueado, abrir ranking
                activity.showRankingActivity();
            }
        });
    }

    @JavascriptInterface
    public String getRanking() {
        // CRÍTICO: Verificar estado actual del usuario
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if (currentUser == null) {
            // Usuario no logueado, iniciar flujo de login
            activity.runOnUiThread(() -> activity.showLoginActivity());
            return "[]";
        }
        
        // Usuario logueado, cargar ranking completo
        try {
            db.collection("apps").document(APP_ID).collection("users")
                    .orderBy("puzzlesCompletados", Query.Direction.DESCENDING)
                    .get()
                    .addOnSuccessListener(queryDocumentSnapshots -> {
                        JSONArray rankingArray = new JSONArray();
                        int position = 1;
                        int userPosition = -1;
                        
                        for (var document : queryDocumentSnapshots) {
                            try {
                                JSONObject userObj = new JSONObject();
                                userObj.put("uid", document.getId());
                                userObj.put("nick", document.getString("nick"));
                                userObj.put("puzzlesCompletados", document.getLong("puzzlesCompletados"));
                                userObj.put("position", position);
                                
                                // Marcar si es el usuario actual
                                if (document.getId().equals(currentUser.getUid())) {
                                    userObj.put("isCurrentUser", true);
                                    userPosition = position;
                                } else {
                                    userObj.put("isCurrentUser", false);
                                }
                                
                                rankingArray.put(userObj);
                                position++;
                            } catch (Exception e) {
                                // Ignorar documentos con datos incompletos
                            }
                        }
                        
                        // Añadir información de posición del usuario
                        JSONObject rankingData = new JSONObject();
                        try {
                            rankingData.put("users", rankingArray);
                            rankingData.put("userPosition", userPosition);
                            rankingData.put("totalUsers", rankingArray.length());
                        } catch (Exception e) {
                            // Error al crear JSON
                        }
                        
                        // Enviar ranking al WebView
                        String jsCode = "if(window.game && window.game.onRankingLoaded) { window.game.onRankingLoaded(" + rankingData.toString() + "); }";
                        activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
                    })
                    .addOnFailureListener(e -> {
                        // Enviar error al WebView
                        String jsCode = "if(window.game && window.game.onRankingError) { window.game.onRankingError('Error al cargar ranking'); }";
                        activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
                    });
        } catch (Exception e) {
            // Error al iniciar consulta
        }
        
        return "[]";
    }

    @JavascriptInterface
    public String addPuzzles(int delta) {
        if (delta <= 0) {
            return "error";
        }
        
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if (currentUser == null) {
            return "error";
        }
        
        // Actualizar puzzles completados en Firestore
        Map<String, Object> updates = new HashMap<>();
        updates.put("puzzlesCompletados", com.google.firebase.firestore.FieldValue.increment(delta));
        updates.put("lastSeen", com.google.firebase.firestore.FieldValue.serverTimestamp());
        
        db.collection("apps").document(APP_ID).collection("users")
                .document(currentUser.getUid())
                .update(updates)
                .addOnSuccessListener(aVoid -> {
                    // Incrementar contador de AdMob
                    activity.incrementPuzzlesCompleted();
                    
                    // Enviar confirmación al WebView
                    String jsCode = "if(window.game && window.game.onPuzzlesAdded) { window.game.onPuzzlesAdded(" + delta + "); }";
                    activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
                })
                .addOnFailureListener(e -> {
                    // Enviar error al WebView
                    String jsCode = "if(window.game && window.game.onPuzzlesError) { window.game.onPuzzlesError('Error al actualizar puzzles'); }";
                    activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
                });
        
        return "success";
    }
    
    @JavascriptInterface
    public String saveGameProgress(String progressData) {
        System.out.println("GameBridge: ===== SAVEGAMEPROGRESS INICIADO =====");
        System.out.println("GameBridge: saveGameProgress llamado con datos: " + progressData);
        System.out.println("GameBridge: currentUserUid: " + this.currentUserUid);
        
        // Para login con nick, usamos el UID del usuario actual
        if (this.currentUserUid == null) {
            System.out.println("GameBridge: ERROR - No hay usuario logueado para guardar progreso");
            return "error";
        }
        
        System.out.println("GameBridge: Guardando progreso para UID: " + this.currentUserUid);
        
        try {
            // Parsear datos del progreso del juego
            JSONObject progress = new JSONObject(progressData);
            
            // Preparar datos para Firestore
            Map<String, Object> updates = new HashMap<>();
            updates.put("lastSeen", com.google.firebase.firestore.FieldValue.serverTimestamp());
            
            // Guardar datos específicos del juego
            if (progress.has("completedLevels")) {
                String completedLevelsStr = progress.getString("completedLevels");
                System.out.println("GameBridge: completedLevels como string: " + completedLevelsStr);
                
                // Parsear el string JSON a JSONArray
                JSONArray completedLevels = new JSONArray(completedLevelsStr);
                System.out.println("GameBridge: completedLevels parseado, longitud: " + completedLevels.length());
                
                updates.put("completedLevels", completedLevelsStr);
                updates.put("puzzlesCompletados", completedLevels.length());
            }
            
            if (progress.has("totalTime")) {
                updates.put("totalTime", progress.getLong("totalTime"));
            }
            
            if (progress.has("audioEnabled")) {
                updates.put("audioEnabled", progress.getBoolean("audioEnabled"));
            }
            
            if (progress.has("currentWorld")) {
                updates.put("currentWorld", progress.getInt("currentWorld"));
            }
            
            if (progress.has("currentLevel")) {
                updates.put("currentLevel", progress.getInt("currentLevel"));
            }
            
            // Actualizar en Firestore
            System.out.println("GameBridge: Iniciando actualización en Firestore...");
            System.out.println("GameBridge: Documento a actualizar: apps/" + APP_ID + "/users/" + this.currentUserUid);
            System.out.println("GameBridge: Datos a actualizar: " + updates.toString());
            
            db.collection("apps").document(APP_ID).collection("users")
                    .document(this.currentUserUid)
                    .update(updates)
                    .addOnSuccessListener(aVoid -> {
                        System.out.println("GameBridge: ✅ Firestore actualizado exitosamente");
                        // Enviar confirmación al WebView
                        String jsCode = "if(window.game && window.game.onProgressSaved) { window.game.onProgressSaved(); }";
                        activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
                    })
                    .addOnFailureListener(e -> {
                        System.out.println("GameBridge: ❌ Error actualizando Firestore: " + e.getMessage());
                        // Enviar error al WebView
                        String jsCode = "if(window.game && window.game.onProgressError) { window.game.onProgressError('Error al guardar progreso'); }";
                        activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
                    });
            
            System.out.println("GameBridge: ===== SAVEGAMEPROGRESS COMPLETADO =====");
            return "success";
        } catch (Exception e) {
            System.out.println("GameBridge: Error parseando datos de progreso: " + e.getMessage());
            System.out.println("GameBridge: ===== SAVEGAMEPROGRESS ERROR =====");
            return "error";
        }
    }

    @JavascriptInterface
    public String getUser() {
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if (currentUser == null) {
            System.out.println("GameBridge: Usuario no logueado en Firebase");
            return "null";
        }
        
        System.out.println("GameBridge: Usuario logueado, UID: " + currentUser.getUid());
        
        // Obtener datos del usuario desde Firestore
        db.collection("apps").document(APP_ID).collection("users")
                .document(currentUser.getUid())
                .get()
                .addOnSuccessListener(documentSnapshot -> {
                    System.out.println("GameBridge: Documento existe: " + documentSnapshot.exists());
                    if (documentSnapshot.exists()) {
                        try {
                            JSONObject userObj = new JSONObject();
                            userObj.put("uid", currentUser.getUid());
                            userObj.put("nick", documentSnapshot.getString("nick"));
                            userObj.put("puzzlesCompletados", documentSnapshot.getLong("puzzlesCompletados"));
                            
                            // Agregar datos del juego si existen
                            if (documentSnapshot.contains("completedLevels")) {
                                userObj.put("completedLevels", documentSnapshot.getString("completedLevels"));
                            }
                            if (documentSnapshot.contains("totalTime")) {
                                userObj.put("totalTime", documentSnapshot.getLong("totalTime"));
                            }
                            if (documentSnapshot.contains("audioEnabled")) {
                                userObj.put("audioEnabled", documentSnapshot.getBoolean("audioEnabled"));
                            }
                            if (documentSnapshot.contains("currentWorld")) {
                                userObj.put("currentWorld", documentSnapshot.getLong("currentWorld"));
                            }
                            if (documentSnapshot.contains("currentLevel")) {
                                userObj.put("currentLevel", documentSnapshot.getLong("currentLevel"));
                            }
                            
                            System.out.println("GameBridge: Enviando datos del usuario: " + userObj.toString());
                            
                            // Enviar datos al WebView
                            String jsCode = "if(window.game && window.game.onUserLoaded) { window.game.onUserLoaded(" + userObj.toString() + "); }";
                            activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
                        } catch (Exception e) {
                            System.out.println("GameBridge: Error al crear JSON: " + e.getMessage());
                        }
                    } else {
                        System.out.println("GameBridge: Documento de usuario no existe en Firestore");
                    }
                })
                .addOnFailureListener(e -> {
                    System.out.println("GameBridge: Error al obtener datos del usuario: " + e.getMessage());
                });
        
        return "loading";
    }

    @JavascriptInterface
    public String setNick(String nick) {
        if (nick == null || nick.trim().isEmpty()) {
            return "error";
        }
        
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if (currentUser == null) {
            return "error";
        }
        
        // Transacción para verificar disponibilidad y crear nick
        String lowerNick = nick.toLowerCase();
        db.runTransaction((com.google.firebase.firestore.Transaction.Function<Void>) transaction -> {
            // Verificar si el nick ya existe
            var nickRef = db.collection("apps").document(APP_ID)
                    .collection("nicks").document(lowerNick);
            
            if (transaction.get(nickRef).exists()) {
                throw new IllegalStateException("NICK_TAKEN");
            }
            
            // Crear documento de nick
            Map<String, Object> nickData = new HashMap<>();
            nickData.put("uid", currentUser.getUid());
            nickData.put("nick", nick);
            nickData.put("createdAt", com.google.firebase.firestore.FieldValue.serverTimestamp());
            transaction.set(nickRef, nickData);
            
            // Crear/actualizar documento de usuario
            var userRef = db.collection("apps").document(APP_ID)
                    .collection("users").document(currentUser.getUid());
            
            Map<String, Object> userData = new HashMap<>();
            userData.put("nick", nick);
            userData.put("puzzlesCompletados", 0);
            userData.put("createdAt", com.google.firebase.firestore.FieldValue.serverTimestamp());
            userData.put("lastSeen", com.google.firebase.firestore.FieldValue.serverTimestamp());
            transaction.set(userRef, userData, com.google.firebase.firestore.SetOptions.merge());
            
            return null;
        }).addOnSuccessListener(aVoid -> {
            // Enviar éxito al WebView
            String jsCode = "if(window.game && window.game.onNickSet) { window.game.onNickSet('success'); }";
            activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
        }).addOnFailureListener(e -> {
            String result = "error";
            if (e.getMessage() != null && e.getMessage().contains("NICK_TAKEN")) {
                result = "NICK_TAKEN";
            }
            
            // Enviar resultado al WebView
            String jsCode = "if(window.game && window.game.onNickSet) { window.game.onNickSet('" + result + "'); }";
            activity.runOnUiThread(() -> webView.evaluateJavascript(jsCode, null));
        });
        
        return "success";
    }

    // Métodos para AdMob
    @JavascriptInterface
    public void showInterstitialAd() {
        activity.runOnUiThread(() -> activity.showInterstitialAd());
    }
    
    @JavascriptInterface
    public void showRewardedAd() {
        activity.runOnUiThread(() -> activity.showRewardedAd());
    }
    
    @JavascriptInterface
    public int getPuzzlesCompleted() {
        return activity.getAdManager().getPuzzlesCompleted();
    }
    
    @JavascriptInterface
    public String loadAsset(String filename) {
        try {
            InputStream inputStream = activity.getAssets().open(filename);
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer);
            inputStream.close();
            return new String(buffer, "UTF-8");
        } catch (IOException e) {
            return null;
        }
    }

    @JavascriptInterface
    public void openLogin() {
        activity.runOnUiThread(() -> {
            // Login directo con Google sin pantalla de registro
            GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                    .requestIdToken(activity.getString(R.string.default_web_client_id))
                    .requestEmail()
                    .build();
            
            GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(activity, gso);
            
            Intent signInIntent = googleSignInClient.getSignInIntent();
            activity.startActivityForResult(signInIntent, 1001);
        });
    }

    @JavascriptInterface
    public void loginWithNick(String nick) {
        System.out.println("=== GAMEBRIDGE: loginWithNick INICIADO ===");
        System.out.println("GameBridge: loginWithNick llamado con nick: " + nick);
        System.out.println("GameBridge: Firebase Auth: " + (mAuth != null ? "OK" : "NULL"));
        System.out.println("GameBridge: Firebase Firestore: " + (db != null ? "OK" : "NULL"));
        System.out.println("GameBridge: WebView: " + (webView != null ? "OK" : "NULL"));
        System.out.println("GameBridge: Activity: " + (activity != null ? "OK" : "NULL"));
        
        // TEST: Responder inmediatamente para verificar que el método funciona
        System.out.println("GameBridge: Enviando respuesta de prueba inmediata...");
        activity.runOnUiThread(() -> {
            String testJsCode = "console.log('TEST: Método Java ejecutado correctamente');";
            webView.evaluateJavascript(testJsCode, null);
        });
        
        if (db == null) {
            System.out.println("GameBridge: ERROR - Firebase Firestore no inicializado");
            activity.runOnUiThread(() -> {
                String jsCode = "if(window.game && window.game.onLoginError) { " +
                        "window.game.onLoginError('Firebase no inicializado'); }";
                webView.evaluateJavascript(jsCode, null);
            });
            return;
        }
        
        activity.runOnUiThread(() -> {
            System.out.println("GameBridge: Iniciando búsqueda en Firebase...");
            System.out.println("GameBridge: APP_ID: " + APP_ID);
            System.out.println("GameBridge: Nick a buscar: " + nick);
            
            try {
                // TEST: Primero probar una consulta simple sin filtros
                System.out.println("GameBridge: Probando consulta simple a Firestore...");
                db.collection("apps").document(APP_ID).collection("users")
                        .limit(1)
                        .get()
                        .addOnSuccessListener(querySnapshot -> {
                            System.out.println("GameBridge: Consulta simple exitosa, documentos: " + querySnapshot.size());
                            
                            // Ahora hacer la consulta real con filtro
                            System.out.println("GameBridge: Haciendo consulta con filtro de nick...");
                            db.collection("apps").document(APP_ID).collection("users")
                                    .whereEqualTo("nick", nick)
                                    .limit(1)
                                    .get()
                                    .addOnSuccessListener(querySnapshot2 -> {
                                        System.out.println("GameBridge: Consulta con filtro completada");
                                        System.out.println("GameBridge: Documentos encontrados: " + querySnapshot2.size());
                                        
                                        if (!querySnapshot2.isEmpty()) {
                                            // Usuario encontrado, obtener sus datos completos
                                            var document = querySnapshot2.getDocuments().get(0);
                                            String uid = document.getId();
                                            Long puzzlesCompletados = document.getLong("puzzlesCompletados");
                                            String completedLevels = document.getString("completedLevels");
                                            Long totalTime = document.getLong("totalTime");
                                            Boolean audioEnabled = document.getBoolean("audioEnabled");
                                            Long currentWorld = document.getLong("currentWorld");
                                            Long currentLevel = document.getLong("currentLevel");
                                            
                                            System.out.println("GameBridge: Usuario encontrado con UID: " + uid);
                                            System.out.println("GameBridge: Puzzles completados: " + puzzlesCompletados);
                                            
                                            // Guardar UID del usuario actual para saveGameProgress
                                            this.currentUserUid = uid;
                                            
                                            // Crear objeto JSON con todos los datos del usuario
                                            String userData = "{";
                                            userData += "\"nick\":\"" + nick + "\",";
                                            userData += "\"uid\":\"" + uid + "\",";
                                            userData += "\"puzzlesCompletados\":" + (puzzlesCompletados != null ? puzzlesCompletados : 0) + ",";
                                            if (completedLevels != null) userData += "\"completedLevels\":" + completedLevels + ",";
                                            if (totalTime != null) userData += "\"totalTime\":" + totalTime + ",";
                                            if (audioEnabled != null) userData += "\"audioEnabled\":" + audioEnabled + ",";
                                            if (currentWorld != null) userData += "\"currentWorld\":" + currentWorld + ",";
                                            if (currentLevel != null) userData += "\"currentLevel\":" + currentLevel + ",";
                                            userData = userData.replaceAll(",$", ""); // Quitar última coma
                                            userData += "}";
                                            
                                            System.out.println("GameBridge: Datos del usuario: " + userData);
                                            
                                            String jsCode = "if(window.game && window.game.onUserLoaded) { " +
                                                    "window.game.onUserLoaded(" + userData + "); }";
                                            System.out.println("GameBridge: Ejecutando JS: " + jsCode);
                                            webView.evaluateJavascript(jsCode, null);
                                            
                                        } else {
                                            System.out.println("GameBridge: Usuario no encontrado con nick: " + nick);
                                            String jsCode = "if(window.game && window.game.onLoginError) { " +
                                                    "window.game.onLoginError('Usuario no encontrado'); }";
                                            webView.evaluateJavascript(jsCode, null);
                                        }
                                    })
                                    .addOnFailureListener(e -> {
                                        System.out.println("GameBridge: Error en consulta con filtro: " + e.getMessage());
                                        e.printStackTrace();
                                        String jsCode = "if(window.game && window.game.onLoginError) { " +
                                                "window.game.onLoginError('Error al buscar usuario: " + e.getMessage() + "'); }";
                                        webView.evaluateJavascript(jsCode, null);
                                    });
                        })
                        .addOnFailureListener(e -> {
                            System.out.println("GameBridge: Error en consulta simple: " + e.getMessage());
                            e.printStackTrace();
                            String jsCode = "if(window.game && window.game.onLoginError) { " +
                                    "window.game.onLoginError('Error al conectar con Firestore: " + e.getMessage() + "'); }";
                            webView.evaluateJavascript(jsCode, null);
                        });
            } catch (Exception e) {
                System.out.println("GameBridge: Excepción al ejecutar consulta: " + e.getMessage());
                e.printStackTrace();
                String jsCode = "if(window.game && window.game.onLoginError) { " +
                        "window.game.onLoginError('Error interno: " + e.getMessage() + "'); }";
                webView.evaluateJavascript(jsCode, null);
            }
        });
    }

    @JavascriptInterface
    public void logout() {
        activity.runOnUiThread(() -> {
            // Cerrar sesión de Firebase
            mAuth.signOut();
            
            // Limpiar UID del usuario actual
            this.currentUserUid = null;
            
            // Enviar confirmación al WebView
            String jsCode = "if(window.game && window.game.onLogoutComplete) { window.game.onLogoutComplete(); }";
            webView.evaluateJavascript(jsCode, null);
        });
    }

    // Método auxiliar para verificar si el usuario está logueado
    private boolean isUserLoggedIn() {
        FirebaseUser currentUser = mAuth.getCurrentUser();
        return currentUser != null;
    }
}
