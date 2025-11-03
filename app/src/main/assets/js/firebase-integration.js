// Firebase Integration para Rincones del Mundo
// Este archivo se carga automáticamente en el juego web

class FirebaseIntegration {
    constructor() {
        console.log('🚀 Inicializando FirebaseIntegration...');
        this.isAndroid = typeof Android !== 'undefined';
        console.log('📱 Es Android:', this.isAndroid);
        console.log('🔍 Android object:', typeof Android);
        
        this.callbacks = {
            onRankingLoaded: null,
            onRankingError: null,
            onPuzzlesAdded: null,
            onPuzzlesError: null,
            onUserLoaded: null,
            onNickSet: null,
            onRewardEarned: null,
            onLogoutComplete: null,
            onProgressSaved: null,
            onProgressError: null
        };
        
        if (this.isAndroid) {
            console.log('✅ Configurando callbacks de Android...');
            this.setupAndroidCallbacks();
        } else {
            console.log('🌐 No es Android, saltando configuración');
        }
    }
    
    setupAndroidCallbacks() {
        // Callbacks para recibir datos de Android
        window.game = window.game || {};
        
        window.game.onRankingLoaded = (ranking) => {
            if (this.callbacks.onRankingLoaded) {
                this.callbacks.onRankingLoaded(ranking);
            }
        };
        
        // Configurar botones de login y ranking
        this.setupLoginButton();
        this.setupRankingButton();
        
        window.game.onRankingError = (error) => {
            if (this.callbacks.onRankingError) {
                this.callbacks.onRankingError(error);
            }
        };
        
        window.game.onPuzzlesAdded = (delta) => {
            if (this.callbacks.onPuzzlesAdded) {
                this.callbacks.onPuzzlesAdded(delta);
            }
        };
        
        window.game.onPuzzlesError = (error) => {
            if (this.callbacks.onPuzzlesError) {
                this.callbacks.onPuzzlesError(error);
            }
        };
        
        window.game.onUserLoaded = (user) => {
            if (this.callbacks.onUserLoaded) {
                this.callbacks.onUserLoaded(user);
            }
        };

        window.game.onLoginError = (error) => {
            if (this.callbacks.onLoginError) {
                this.callbacks.onLoginError(error);
            }
        };
        
        window.game.onNickSet = (result) => {
            if (this.callbacks.onNickSet) {
                this.callbacks.onNickSet(result);
            }
        };
        
        window.game.onRewardEarned = (amount) => {
            if (this.callbacks.onRewardEarned) {
                this.callbacks.onRewardEarned(amount);
            }
        };
        
        window.game.onLogoutComplete = () => {
            if (this.callbacks.onLogoutComplete) {
                this.callbacks.onLogoutComplete();
            }
        };
        
        // Callback onUserLoaded ya está definido arriba, no duplicar
        
        window.game.onProgressSaved = () => {
            if (this.callbacks.onProgressSaved) {
                this.callbacks.onProgressSaved();
            }
        };
        
        window.game.onProgressError = (error) => {
            if (this.callbacks.onProgressError) {
                this.callbacks.onProgressError(error);
            }
        };
    }
    
    // Métodos públicos para el juego
    openRanking() {
        if (this.isAndroid) {
            Android.openRanking();
        } else {
            console.log('Ranking no disponible en web');
        }
    }
    
    getRanking() {
        if (this.isAndroid) {
            return Android.getRanking();
        } else {
            console.log('Ranking no disponible en web');
            return "[]";
        }
    }
    
    addPuzzles(delta) {
        if (this.isAndroid) {
            return Android.addPuzzles(delta);
        } else {
            console.log('Sincronización no disponible en web');
            return "success";
        }
    }
    
    getUser() {
        if (this.isAndroid) {
            return Android.getUser();
        } else {
            console.log('Usuario no disponible en web');
            return null;
        }
    }
    
    setNick(nick) {
        if (this.isAndroid) {
            return Android.setNick(nick);
        } else {
            console.log('Nick no disponible en web');
            return "success";
        }
    }
    
    // Métodos para AdMob
    showInterstitialAd() {
        if (this.isAndroid) {
            Android.showInterstitialAd();
        } else {
            console.log('Anuncios no disponibles en web');
        }
    }
    
    showRewardedAd() {
        if (this.isAndroid) {
            Android.showRewardedAd();
        } else {
            console.log('Anuncios no disponibles en web');
        }
    }
    
    getPuzzlesCompleted() {
        if (this.isAndroid) {
            return Android.getPuzzlesCompleted();
        } else {
            return 0;
        }
    }
    
    // Métodos para configurar callbacks
    onRankingLoaded(callback) {
        this.callbacks.onRankingLoaded = callback;
    }
    
    onRankingError(callback) {
        this.callbacks.onRankingError = callback;
    }
    
    onPuzzlesAdded(callback) {
        this.callbacks.onPuzzlesAdded = callback;
    }
    
    onPuzzlesError(callback) {
        this.callbacks.onPuzzlesError = callback;
    }
    
    onUserLoaded(callback) {
        this.callbacks.onUserLoaded = callback;
    }
    
    onLoginError(callback) {
        this.callbacks.onLoginError = callback;
    }
    
    onNickSet(callback) {
        this.callbacks.onNickSet = callback;
    }
    
    onRewardEarned(callback) {
        this.callbacks.onRewardEarned = callback;
    }
    
    onLogoutComplete(callback) {
        this.callbacks.onLogoutComplete = callback;
    }
    
    onProgressSaved(callback) {
        this.callbacks.onProgressSaved = callback;
    }
    
    onProgressError(callback) {
        this.callbacks.onProgressError = callback;
    }
    
    setupLoginButton() {
        console.log('🔧 Configurando botón de login...');
        const loginBtn = document.getElementById('menu-login');
        console.log('🔍 Botón encontrado:', loginBtn);
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                console.log('👤 Botón de login presionado!');
                if (this.isAndroid) {
                    console.log('📱 Llamando a Android.openLogin()');
                    Android.openLogin();
                } else {
                    console.log('Login no disponible en web');
                }
            });
            console.log('✅ Event listener añadido al botón de login');
        } else {
            console.error('❌ No se encontró el botón de login');
        }
    }
    
    setupRankingButton() {
        const rankingBtn = document.getElementById('menu-ranking');
        if (rankingBtn) {
            rankingBtn.addEventListener('click', () => {
                if (this.isAndroid) {
                    Android.openRanking();
                } else {
                    console.log('Ranking no disponible en web');
                }
            });
        }
    }
}

// Crear instancia global
window.firebaseIntegration = new FirebaseIntegration();

// Integración con el juego existente
if (typeof game !== 'undefined') {
    // Extender el juego con funcionalidades de Firebase
    game.firebase = window.firebaseIntegration;
    
    // Interceptar completado de niveles para sincronizar
    const originalCompleteLevel = game.completeLevel;
    game.completeLevel = function(world, level) {
        // Llamar método original
        originalCompleteLevel.call(this, world, level);
        
        // Sincronizar con Firebase
        if (window.firebaseIntegration.isAndroid) {
            window.firebaseIntegration.addPuzzles(1);
        }
    };
    
    // Configurar callbacks para mostrar ranking
    window.firebaseIntegration.onRankingLoaded((rankingData) => {
        console.log('Ranking cargado:', rankingData);
        // rankingData contiene:
        // - users: array de usuarios con posición
        // - userPosition: posición del usuario actual
        // - totalUsers: total de usuarios
        showRankingModal(rankingData);
    });
    
    window.firebaseIntegration.onRankingError((error) => {
        console.error('Error al cargar ranking:', error);
        // Mostrar error en la UI
        showError('Error al cargar ranking');
    });
    
    // Función para mostrar ranking (implementar según tu UI)
    function showRankingModal(rankingData) {
        // Implementar modal de ranking
        console.log('Mostrando ranking completo:', rankingData);
        console.log('Total de usuarios:', rankingData.totalUsers);
        console.log('Tu posición:', rankingData.userPosition);
        console.log('Usuarios:', rankingData.users);
        
        // Ejemplo de cómo mostrar el ranking:
        // - rankingData.users es un array con todos los usuarios
        // - Cada usuario tiene: uid, nick, puzzlesCompletados, position, isCurrentUser
        // - rankingData.userPosition es tu posición específica
        // - rankingData.totalUsers es el total de usuarios
    }
    
    // Función para mostrar errores (implementar según tu UI)
    function showError(message) {
        // Implementar notificación de error
        console.error('Error:', message);
    }
    
    // Configurar callback de logout
    window.firebaseIntegration.onLogoutComplete(() => {
        console.log('Logout completado desde Android');
        if (window.game && window.game.handleLogoutComplete) {
            window.game.handleLogoutComplete();
        }
    });
    
    // Configurar callback de usuario cargado
    window.firebaseIntegration.onUserLoaded((userData) => {
        console.log('Usuario cargado desde Android:', userData);
        if (window.game && window.game.showUserWelcome) {
            window.game.showUserWelcome(userData);
        }
    });

    // Configurar callback de error de login
    window.firebaseIntegration.onLoginError((error) => {
        console.error('Error de login:', error);
        if (window.game && window.game.hideLoadingMessage) {
            window.game.hideLoadingMessage();
        }
        if (window.game && window.game.showTemporaryMessage) {
            window.game.showTemporaryMessage('Error: ' + error);
        }
    });
    
    // Configurar callbacks de progreso
    window.firebaseIntegration.onProgressSaved(() => {
        console.log('Progreso guardado en Firebase correctamente');
    });
    
    window.firebaseIntegration.onProgressError((error) => {
        console.error('Error al guardar progreso en Firebase:', error);
    });
}

console.log('Firebase Integration cargado correctamente');
