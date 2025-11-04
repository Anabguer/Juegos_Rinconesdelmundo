package com.intocables.rinconesdelmundo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.webkit.JavascriptInterface;
import android.webkit.CookieManager;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.SetOptions;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.Map;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;

public class GameActivity extends Activity {
    private static final String TAG = "AndroidInterface";
    private static final int RC_SIGN_IN = 9001;
    private static final String APP_ID = "rinconesdelmundo";
    
    private WebView webView;
    private AdView adView;
    private InterstitialAd interstitialAd;
    private GameManager gameManager;
    private FirebaseAuth mAuth;
    private GoogleSignInClient mGoogleSignInClient;
    private FirebaseFirestore db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        
        enableImmersiveMode();
        
        // Inicializar AdMob
        MobileAds.initialize(this, new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {
                Log.d(TAG, "AdMob initialized");
                // Configurar AdView después de inicializar AdMob
                try {
                    adView = findViewById(R.id.adView);
                    if (adView != null) {
                        AdRequest adRequest = new AdRequest.Builder().build();
                        adView.loadAd(adRequest);
                        Log.d(TAG, "AdView cargado correctamente");
                    } else {
                        Log.w(TAG, "AdView no encontrado en el layout");
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error cargando AdView: " + e.getMessage(), e);
                }
                
                // Cargar primer anuncio intersticial
                loadInterstitialAd();
            }
        });
        
        // Inicializar Firebase Auth
        mAuth = FirebaseAuth.getInstance();
        
        // Configurar Google Sign-In (usar Web Client ID desde recursos)
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
        
        // Inicializar Firestore
        db = FirebaseFirestore.getInstance();
        
        initViews();
        setupWebView();
        initGameManager();
        
        // Verificar si hay sesión al iniciar
        checkUserOnStartup();
    }
    
    private void checkUserOnStartup() {
        Log.d(TAG, "═══════════════════════════════════════");
        Log.d(TAG, "🚀 checkUserOnStartup - INICIO");
        
        // NO verificar Firebase aquí, solo dejar que JavaScript maneje localStorage
        // Si hay datos en localStorage sin nick, JavaScript los borrará
        Log.d(TAG, "👤 Verificación de inicio completada - JavaScript manejará localStorage");
        Log.d(TAG, "═══════════════════════════════════════");
    }

    private void initViews() {
        webView = findViewById(R.id.webview_game);
    }

    private void setupWebView() {
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        
        // Añadir interfaces JavaScript
        webView.addJavascriptInterface(new AndroidInterface(this), "AndroidInterface");
        webView.addJavascriptInterface(new WebAppInterface(), "Android");
        
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });
        
        // Habilitar soporte para alert, confirm, prompt
        webView.setWebChromeClient(new android.webkit.WebChromeClient() {
            @Override
            public boolean onJsConfirm(WebView view, String url, String message, android.webkit.JsResult result) {
                new android.app.AlertDialog.Builder(GameActivity.this)
                        .setTitle("Confirmar")
                        .setMessage(message)
                        .setPositiveButton("Aceptar", (dialog, which) -> result.confirm())
                        .setNegativeButton("Cancelar", (dialog, which) -> result.cancel())
                        .setCancelable(false)
                        .create()
                        .show();
                return true;
            }
            
            @Override
            public boolean onJsAlert(WebView view, String url, String message, android.webkit.JsResult result) {
                new android.app.AlertDialog.Builder(GameActivity.this)
                        .setTitle("Información")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> result.confirm())
                        .setCancelable(false)
                        .create()
                        .show();
                return true;
            }
        });
        
        // Cargar el juego desde assets
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void enableImmersiveMode() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
                controller.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        } else {
            View decorView = getWindow().getDecorView();
            decorView.setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                    View.SYSTEM_UI_FLAG_FULLSCREEN |
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                    View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            );
        }
        
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            enableImmersiveMode();
        }
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        try {
            if (adView != null) {
                adView.resume();
            }
        } catch (Exception e) {
            Log.e(TAG, "Error en onResume de AdView: " + e.getMessage());
        }
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        try {
            if (adView != null) {
                adView.pause();
            }
        } catch (Exception e) {
            Log.e(TAG, "Error en onPause de AdView: " + e.getMessage());
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            if (adView != null) {
                adView.destroy();
                adView = null;
            }
        } catch (Exception e) {
            Log.e(TAG, "Error en onDestroy de AdView: " + e.getMessage());
        }
    }

    // ===== ANUNCIOS INTERSTICIALES =====
    public void loadInterstitialAd() {
        AdRequest adRequest = new AdRequest.Builder().build();
        
        InterstitialAd.load(this, "ca-app-pub-3940256099942544/1033173712", adRequest,
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(InterstitialAd ad) {
                    interstitialAd = ad;
                    Log.d(TAG, "✅ Anuncio intersticial cargado");
                    
                    // Configurar callbacks para cuando se muestra el anuncio
                    interstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                        @Override
                        public void onAdDismissedFullScreenContent() {
                            Log.d(TAG, "📱 Anuncio cerrado");
                            interstitialAd = null;
                            // Notificar a JavaScript que el anuncio se cerró
                            evalJS("window.__onAdClosed && __onAdClosed()");
                            // Cargar el siguiente anuncio
                            loadInterstitialAd();
                        }

                        @Override
                        public void onAdFailedToShowFullScreenContent(com.google.android.gms.ads.AdError adError) {
                            Log.e(TAG, "❌ Error mostrando anuncio: " + adError.getMessage());
                            interstitialAd = null;
                            evalJS("window.__onAdClosed && __onAdClosed()");
                            loadInterstitialAd();
                        }

                        @Override
                        public void onAdShowedFullScreenContent() {
                            Log.d(TAG, "📺 Anuncio mostrado en pantalla completa");
                        }
                    });
                }

                @Override
                public void onAdFailedToLoad(LoadAdError loadAdError) {
                    Log.e(TAG, "❌ Error cargando anuncio: " + loadAdError.getMessage());
                    interstitialAd = null;
                }
            });
    }

    public void showInterstitialAd() {
        if (interstitialAd != null) {
            Log.d(TAG, "📺 Mostrando anuncio intersticial...");
            interstitialAd.show(this);
        } else {
            Log.w(TAG, "⚠️ Anuncio no está listo, cargando...");
            evalJS("window.__onAdClosed && __onAdClosed()");
            loadInterstitialAd();
        }
    }

    private void initGameManager() {
        gameManager = new GameManager(this);
    }

    // ===== LOGIN =====
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        
        Log.d(TAG, "🔍 onActivityResult - requestCode: " + requestCode + ", resultCode: " + resultCode);
        
        if (requestCode == RC_SIGN_IN) {
            Log.d(TAG, "🔍 RC_SIGN_IN detectado");
            
            if (resultCode == RESULT_CANCELED) {
                Log.d(TAG, "⚠️ Usuario canceló el login");
                evalJS("window.__onNativeLoginError && __onNativeLoginError('user_cancelled')");
                return;
            }
            
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                Log.d(TAG, "✅ GoogleSignInAccount obtenida: " + account.getEmail());
                Log.d(TAG, "✅ ID Token: " + (account.getIdToken() != null ? "Presente" : "NULL"));
                
                AuthCredential credential = GoogleAuthProvider.getCredential(account.getIdToken(), null);
                Log.d(TAG, "✅ Credential creada, intentando signInWithCredential...");
                
                mAuth.signInWithCredential(credential).addOnCompleteListener(this, authTask -> {
                    if (authTask.isSuccessful()) {
                        Log.d(TAG, "✅ signInWithCredential EXITOSO");
                        FirebaseUser user = mAuth.getCurrentUser();
                        if (user != null) {
                            Log.d(TAG, "✅ FirebaseUser obtenido: " + user.getUid());
                            sendUserToJS(user);
                        } else {
                            Log.e(TAG, "❌ FirebaseUser es NULL después de login exitoso");
                            evalJS("window.__onNativeLoginError && __onNativeLoginError('user_null')");
                        }
                    } else {
                        Log.e(TAG, "❌ signInWithCredential FALLÓ", authTask.getException());
                        evalJS("window.__onNativeLoginError && __onNativeLoginError('auth_failed')");
                    }
                });
            } catch (ApiException e) {
                Log.e(TAG, "❌ GoogleSignIn ApiException - StatusCode: " + e.getStatusCode(), e);
                Log.e(TAG, "❌ Mensaje: " + e.getMessage());
                evalJS("window.__onNativeLoginError && __onNativeLoginError('gsi_failed')");
            }
        }
    }

    public void doNativeLogin() {
        Log.d(TAG, "🚀 Starting Google Sign-In...");
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    public void doNativeLogout() {
        Log.d(TAG, "🚪 logout() called");
        mAuth.signOut();
        Log.d(TAG, "🔥 Firebase signOut() ejecutado");
        
        mGoogleSignInClient.signOut().addOnCompleteListener(this, t -> {
            Log.d(TAG, "✅ Google signOut done");
            CookieManager cm = CookieManager.getInstance();
            cm.removeAllCookies(null);
            cm.flush();
            Log.d(TAG, "🍪 Cookies limpiadas");
            
            // Borrar TODO el localStorage, no solo 'user'
            String jsCode = "console.log('🗑️ Borrando localStorage...'); localStorage.clear(); console.log('✅ localStorage.length después de clear:', localStorage.length); window.__onNativeLogout && __onNativeLogout()";
            Log.d(TAG, "📱 Ejecutando JS: " + jsCode);
            evalJS(jsCode);
        });
        
        mGoogleSignInClient.revokeAccess().addOnCompleteListener(this, t -> {
            Log.d(TAG, "🔒 Acceso revocado: " + t.isSuccessful());
        });
    }

    public void sendUserToJS(FirebaseUser u) {
        String uid = u.getUid();
        String email = u.getEmail() == null ? "" : u.getEmail();
        String name = u.getDisplayName() == null ? "" : u.getDisplayName();
        
        Log.d(TAG, "═══════════════════════════════════════");
        Log.d(TAG, "📊 sendUserToJS - DATOS ANTES DE VERIFICAR:");
        Log.d(TAG, "   UID: " + uid);
        Log.d(TAG, "   Email: " + email);
        Log.d(TAG, "   DisplayName: " + name);
        Log.d(TAG, "   Ruta a verificar: apps/" + APP_ID + "/users/" + uid);
        Log.d(TAG, "═══════════════════════════════════════");
        
        db.collection("apps").document(APP_ID).collection("users").document(uid).get()
                .addOnSuccessListener(doc -> {
                    Log.d(TAG, "═══════════════════════════════════════");
                    Log.d(TAG, "🔍 RESULTADO DE LA CONSULTA:");
                    Log.d(TAG, "   Documento existe: " + doc.exists());
                    
                    if (doc.exists()) {
                        // Mostrar todos los datos del documento
                        Map<String, Object> data = doc.getData();
                        if (data != null) {
                            Log.d(TAG, "   📋 CONTENIDO DEL DOCUMENTO:");
                            for (Map.Entry<String, Object> entry : data.entrySet()) {
                                Log.d(TAG, "      " + entry.getKey() + ": " + entry.getValue());
                            }
                        } else {
                            Log.d(TAG, "   ⚠️ Documento existe pero data es NULL");
                        }
                        
                        // Usuario EXISTE en Rincones del Mundo
                        Log.d(TAG, "✅ Usuario pertenece a Rincones del Mundo");
                        
                        boolean hasNick = doc.getString("nick") != null && !doc.getString("nick").isEmpty();
                        String nick = hasNick ? doc.getString("nick") : "";
                        
                        // Obtener configuración de audio del usuario
                        Boolean audioEnabled = doc.getBoolean("audioEnabled");
                        Boolean soundEnabled = doc.getBoolean("soundEnabled");
                        if (audioEnabled == null) audioEnabled = true; // Default: true
                        if (soundEnabled == null) soundEnabled = true; // Default: true
                        
                        Log.d(TAG, "   hasNick: " + hasNick);
                        Log.d(TAG, "   nick: '" + nick + "'");
                        Log.d(TAG, "   audioEnabled: " + audioEnabled);
                        Log.d(TAG, "   soundEnabled: " + soundEnabled);
                        
                        try {
                            JSONObject payload = new JSONObject();
                            payload.put("uid", uid);
                            payload.put("email", email);
                            payload.put("displayName", name);
                            payload.put("hasNick", hasNick);
                            payload.put("nick", nick);
                            payload.put("audioEnabled", audioEnabled);
                            payload.put("soundEnabled", soundEnabled);
                            
                            Log.d(TAG, "📤 PAYLOAD ENVIADO A JS:");
                            Log.d(TAG, "   " + payload.toString());
                            Log.d(TAG, "═══════════════════════════════════════");
                            
                            evalJS("window.__onNativeLogin && __onNativeLogin(" + JSONObject.quote(payload.toString()) + ")");
                        } catch (Exception e) {
                            Log.e(TAG, "❌ JSON error", e);
                        }
                    } else {
                        // Usuario NO existe en Rincones del Mundo → PEDIR NICK (es usuario nuevo o de otra app)
                        Log.d(TAG, "⚠️ DECISIÓN: Usuario NO encontrado en Rincones del Mundo");
                        Log.d(TAG, "⚠️ RAZÓN: El documento apps/" + APP_ID + "/users/" + uid + " NO EXISTE");
                        Log.d(TAG, "✅ ACCIÓN: Solicitar nick (usuario nuevo o de otra app)");
                        Log.d(TAG, "═══════════════════════════════════════");
                        
                        // Enviar datos a JS para pedir nick (usuario nuevo)
                        try {
                            JSONObject payload = new JSONObject();
                            payload.put("uid", uid);
                            payload.put("email", email);
                            payload.put("displayName", name);
                            payload.put("hasNick", false);
                            payload.put("nick", "");
                            payload.put("audioEnabled", true); // Default para usuario nuevo
                            payload.put("soundEnabled", true); // Default para usuario nuevo
                            
                            Log.d(TAG, "📤 PAYLOAD ENVIADO A JS (usuario nuevo sin datos):");
                            Log.d(TAG, "   " + payload.toString());
                            Log.d(TAG, "═══════════════════════════════════════");
                            
                            evalJS("window.__onNativeLogin && __onNativeLogin(" + JSONObject.quote(payload.toString()) + ")");
                        } catch (Exception e) {
                            Log.e(TAG, "❌ JSON error", e);
                        }
                    }
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "═══════════════════════════════════════");
                    Log.e(TAG, "❌ ERROR EN LA CONSULTA:");
                    Log.e(TAG, "   Mensaje: " + e.getMessage());
                    Log.e(TAG, "   Tipo: " + e.getClass().getName());
                    if (e.getCause() != null) {
                        Log.e(TAG, "   Causa: " + e.getCause().getMessage());
                    }
                    Log.e(TAG, "⚠️ ACCIÓN: Cerrar sesión por seguridad");
                    Log.e(TAG, "═══════════════════════════════════════");
                    doNativeLogout();
                });
    }

    public void saveNickNative(String nick) {
        FirebaseUser u = mAuth.getCurrentUser();
        if (u == null) {
            Log.e(TAG, "❌ No hay usuario logueado");
            evalJS("window.__onSaveNick && __onSaveNick(false, 'not_logged_in')");
            return;
        }
        
        Log.d(TAG, "💾 Validando nick '" + nick + "'");
        
        db.collection("apps").document(APP_ID).collection("nicks").document(nick).get()
                .addOnSuccessListener(nickDoc -> {
                    if (nickDoc.exists()) {
                        String existingUid = nickDoc.getString("uid");
                        if (!u.getUid().equals(existingUid)) {
                            Log.e(TAG, "❌ Nick ocupado");
                            evalJS("window.__onSaveNick && __onSaveNick(false, 'nick_taken')");
                            return;
                        }
                    }
                    
                    saveNickToBothCollections(nick, u);
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "❌ Error verificando nick", e);
                    evalJS("window.__onSaveNick && __onSaveNick(false, 'check_failed')");
                });
    }

    private void saveNickToBothCollections(String nick, FirebaseUser u) {
        Log.d(TAG, "💾 Guardando nick '" + nick + "'");
        
        Map<String, Object> userData = new HashMap<>();
        userData.put("nick", nick);
        userData.put("email", u.getEmail());
        userData.put("displayName", u.getDisplayName());
        userData.put("audioEnabled", true);
        userData.put("soundEnabled", true);
        userData.put("lastSeen", java.time.Instant.now().toString());
        userData.put("createdAt", java.time.Instant.now().toString());
        
        Map<String, Object> nickData = new HashMap<>();
        nickData.put("uid", u.getUid());
        nickData.put("email", u.getEmail());
        nickData.put("displayName", u.getDisplayName());
        nickData.put("nick", nick);
        nickData.put("createdAt", java.time.Instant.now().toString());
        
        db.collection("apps").document(APP_ID).collection("users").document(u.getUid())
                .set(userData, SetOptions.merge())
                .addOnSuccessListener(v -> {
                    Log.d(TAG, "✅ Usuario guardado");
                    
                    db.collection("apps").document(APP_ID).collection("nicks").document(nick)
                            .set(nickData, SetOptions.merge())
                            .addOnSuccessListener(v2 -> {
                                Log.d(TAG, "✅ Nick guardado");
                                evalJS("window.__onSaveNick && __onSaveNick(true)");
                            })
                            .addOnFailureListener(e -> {
                                Log.e(TAG, "❌ Error en nicks", e);
                                evalJS("window.__onSaveNick && __onSaveNick(false, 'nicks_save_failed')");
                            });
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "❌ Error en users", e);
                    evalJS("window.__onSaveNick && __onSaveNick(false, 'users_save_failed')");
                });
    }

    public void evalJS(String js) {
        runOnUiThread(() -> webView.evaluateJavascript(js, null));
    }

    // Interfaz JavaScript para comunicación con el juego
    public class WebAppInterface {
        @JavascriptInterface
        public void showToast(String message) {
            Toast.makeText(GameActivity.this, message, Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void saveProgress(String progress) {
            gameManager.saveProgress(progress);
        }

        @JavascriptInterface
        public String loadProgress() {
            return gameManager.loadProgress();
        }

        @JavascriptInterface
        public void showAd() {
            Toast.makeText(GameActivity.this, "Anuncio simulado", Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void playSound(String soundType) {
            gameManager.playSound(soundType);
        }

        @JavascriptInterface
        public String loadAsset(String assetPath) {
            try {
                java.io.InputStream inputStream = getAssets().open(assetPath);
                java.util.Scanner scanner = new java.util.Scanner(inputStream).useDelimiter("\\A");
                String content = scanner.hasNext() ? scanner.next() : "";
                scanner.close();
                inputStream.close();
                return content;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
