package com.intocables.rinconesdelmundo;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.gms.ads.AdView;

public class MainActivity extends AppCompatActivity {
    
    private static final String APP_ID = "rinconesdelmundo";
    private WebView webView;
    private GameBridge gameBridge;
    private AdManager adManager;
    private AdView adView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Quitar barra de título para pantalla completa
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }
        
        setContentView(R.layout.activity_main);
        
        setupAdMob();
        setupWebView();
    }
    
    private void setupAdMob() {
        adManager = new AdManager(this);
        adView = findViewById(R.id.adView);
        adManager.loadBanner(adView);
        adManager.loadInterstitial();
        adManager.loadRewarded();
    }
    
    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView() {
        webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        
        // Limpiar caché completamente
        webView.clearCache(true);
        webView.clearHistory();
        webView.clearFormData();
        webView.clearMatches();
        webView.clearSslPreferences();
        
        // Forzar recarga de datos
        webView.getSettings().setCacheMode(android.webkit.WebSettings.LOAD_NO_CACHE);
        
        // Configurar GameBridge
        gameBridge = new GameBridge(this);
        webView.addJavascriptInterface(gameBridge, "Android");
        
        // Configurar WebViewClient
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false; // Permitir que WebView maneje todas las URLs
            }
            
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Forzar recarga de estilos
                view.evaluateJavascript("document.querySelectorAll('link[rel=stylesheet]').forEach(link => { link.href = link.href + '?v=' + Date.now(); });", null);
            }
        });
        
        // Cargar el juego con timestamp único
        String timestamp = String.valueOf(System.currentTimeMillis());
        webView.loadUrl("file:///android_asset/index.html?v=" + timestamp + "&force=" + Math.random());
    }
    
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
    
    // Métodos públicos para GameBridge
    public void showLoginActivity() {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }
    
    public void showNickSetupActivity() {
        Intent intent = new Intent(this, NickSetupActivity.class);
        startActivity(intent);
    }
    
    public void showRankingActivity() {
        Intent intent = new Intent(this, RankingActivity.class);
        startActivity(intent);
    }
    
    // Métodos para AdMob
    public void showInterstitialAd() {
        if (adManager != null) {
            adManager.showInterstitial(this);
        }
    }
    
    public void showRewardedAd() {
        if (adManager != null) {
            adManager.showRewarded(this, rewardItem -> {
                // Usuario ganó recompensa
                String jsCode = "if(window.game && window.game.onRewardEarned) { window.game.onRewardEarned(" + rewardItem.getAmount() + "); }";
                webView.evaluateJavascript(jsCode, null);
            });
        }
    }
    
    public void incrementPuzzlesCompleted() {
        if (adManager != null) {
            adManager.incrementPuzzlesCompleted();
            
            // Verificar si debe mostrar anuncio intersticial
            if (adManager.shouldShowInterstitial()) {
                showInterstitialAd();
            }
        }
    }
    
    public AdManager getAdManager() {
        return adManager;
    }
}
