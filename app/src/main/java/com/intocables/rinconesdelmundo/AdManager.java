package com.intocables.rinconesdelmundo;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;

public class AdManager {
    
    private static final String PREFS_NAME = "AdManagerPrefs";
    private static final String KEY_PUZZLES_COMPLETED = "puzzles_completed";
    private static final int INTERSTITIAL_INTERVAL = 5; // Cada 5 puzzles
    
    private Context context;
    private InterstitialAd interstitialAd;
    private RewardedAd rewardedAd;
    private int puzzlesCompleted;
    
    public AdManager(Context context) {
        this.context = context;
        MobileAds.initialize(context, initializationStatus -> {
            // AdMob inicializado
        });
        loadPuzzlesCompleted();
    }
    
    // Cargar banner
    public void loadBanner(AdView adView) {
        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);
    }
    
    // Cargar anuncio intersticial
    public void loadInterstitial() {
        AdRequest adRequest = new AdRequest.Builder().build();
        InterstitialAd.load(context, context.getString(R.string.admob_interstitial_id), adRequest,
                new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(InterstitialAd ad) {
                        interstitialAd = ad;
                    }
                    
                    @Override
                    public void onAdFailedToLoad(LoadAdError adError) {
                        interstitialAd = null;
                    }
                });
    }
    
    // Cargar anuncio bonificado
    public void loadRewarded() {
        AdRequest adRequest = new AdRequest.Builder().build();
        RewardedAd.load(context, context.getString(R.string.admob_rewarded_id), adRequest,
                new RewardedAdLoadCallback() {
                    @Override
                    public void onAdLoaded(RewardedAd ad) {
                        rewardedAd = ad;
                    }
                    
                    @Override
                    public void onAdFailedToLoad(LoadAdError adError) {
                        rewardedAd = null;
                    }
                });
    }
    
    // Mostrar anuncio intersticial
    public void showInterstitial(Activity activity) {
        if (interstitialAd != null) {
            interstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                @Override
                public void onAdDismissedFullScreenContent() {
                    interstitialAd = null;
                    loadInterstitial(); // Cargar siguiente anuncio
                }
                
                @Override
                public void onAdFailedToShowFullScreenContent(AdError adError) {
                    interstitialAd = null;
                    loadInterstitial(); // Cargar siguiente anuncio
                }
            });
            interstitialAd.show(activity);
        }
    }
    
    // Mostrar anuncio bonificado
    public void showRewarded(Activity activity, OnUserEarnedRewardListener rewardListener) {
        if (rewardedAd != null) {
            rewardedAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                @Override
                public void onAdDismissedFullScreenContent() {
                    rewardedAd = null;
                    loadRewarded(); // Cargar siguiente anuncio
                }
                
                @Override
                public void onAdFailedToShowFullScreenContent(AdError adError) {
                    rewardedAd = null;
                    loadRewarded(); // Cargar siguiente anuncio
                }
            });
            rewardedAd.show(activity, rewardListener);
        }
    }
    
    // Verificar si debe mostrar anuncio intersticial
    public boolean shouldShowInterstitial() {
        return puzzlesCompleted > 0 && puzzlesCompleted % INTERSTITIAL_INTERVAL == 0;
    }
    
    // Incrementar puzzles completados
    public void incrementPuzzlesCompleted() {
        puzzlesCompleted++;
        savePuzzlesCompleted();
    }
    
    // Obtener puzzles completados
    public int getPuzzlesCompleted() {
        return puzzlesCompleted;
    }
    
    // Cargar puzzles completados desde SharedPreferences
    private void loadPuzzlesCompleted() {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        puzzlesCompleted = prefs.getInt(KEY_PUZZLES_COMPLETED, 0);
    }
    
    // Guardar puzzles completados en SharedPreferences
    private void savePuzzlesCompleted() {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putInt(KEY_PUZZLES_COMPLETED, puzzlesCompleted).apply();
    }
    
    // Resetear contador (para testing)
    public void resetPuzzlesCompleted() {
        puzzlesCompleted = 0;
        savePuzzlesCompleted();
    }
}

