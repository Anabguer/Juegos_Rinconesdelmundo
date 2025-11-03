package com.intocables.rinconesdelmundo;

import android.content.Context;
import android.content.SharedPreferences;
import android.media.MediaPlayer;
import android.media.SoundPool;
import android.util.Log;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class GameManager {
    private static final String TAG = "GameManager";
    private static final String PREFS_NAME = "RinconesDelMundo";
    
    private Context context;
    private SharedPreferences prefs;
    private Gson gson;
    
    // Audio
    private MediaPlayer backgroundMusic;
    private SoundPool soundPool;
    private Map<String, Integer> soundMap;
    
    public GameManager(Context context) {
        this.context = context;
        this.prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        this.gson = new Gson();
        this.soundMap = new HashMap<>();
        
        initAudio();
    }
    
    private void initAudio() {
        try {
            // Inicializar SoundPool
            soundPool = new SoundPool.Builder()
                    .setMaxStreams(5)
                    .build();
            
            // Cargar sonidos
            soundMap.put("move", soundPool.load(context, R.raw.move, 1));
            soundMap.put("complete", soundPool.load(context, R.raw.complete, 1));
            
            // Inicializar música de fondo
            backgroundMusic = MediaPlayer.create(context, R.raw.background);
            if (backgroundMusic != null) {
                backgroundMusic.setLooping(true);
                backgroundMusic.setVolume(0.3f, 0.3f);
            }
            
        } catch (Exception e) {
            Log.e(TAG, "Error inicializando audio", e);
        }
    }
    
    public void playSound(String soundName) {
        try {
            Integer soundId = soundMap.get(soundName);
            if (soundId != null) {
                soundPool.play(soundId, 1.0f, 1.0f, 1, 0, 1.0f);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error reproduciendo sonido: " + soundName, e);
        }
    }
    
    public void startBackgroundMusic() {
        try {
            if (backgroundMusic != null && !backgroundMusic.isPlaying()) {
                backgroundMusic.start();
            }
        } catch (Exception e) {
            Log.e(TAG, "Error iniciando música de fondo", e);
        }
    }
    
    public void stopBackgroundMusic() {
        try {
            if (backgroundMusic != null && backgroundMusic.isPlaying()) {
                backgroundMusic.pause();
            }
        } catch (Exception e) {
            Log.e(TAG, "Error parando música de fondo", e);
        }
    }
    
    public void setAudioEnabled(boolean enabled) {
        prefs.edit().putBoolean("audio_enabled", enabled).apply();
        if (enabled) {
            startBackgroundMusic();
        } else {
            stopBackgroundMusic();
        }
    }
    
    public boolean isAudioEnabled() {
        return prefs.getBoolean("audio_enabled", true);
    }
    
    public void saveProgress(String progress) {
        prefs.edit().putString("game_progress", progress).apply();
    }
    
    public String loadProgress() {
        return prefs.getString("game_progress", "{}");
    }
    
    public void saveSetting(String key, String value) {
        prefs.edit().putString(key, value).apply();
    }
    
    public String loadSetting(String key, String defaultValue) {
        return prefs.getString(key, defaultValue);
    }
    
    public void release() {
        try {
            if (backgroundMusic != null) {
                backgroundMusic.release();
                backgroundMusic = null;
            }
            if (soundPool != null) {
                soundPool.release();
                soundPool = null;
            }
        } catch (Exception e) {
            Log.e(TAG, "Error liberando recursos de audio", e);
        }
    }
}