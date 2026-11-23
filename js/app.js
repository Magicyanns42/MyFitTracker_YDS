// Main App - PWA Setup and initialization
class App {
    constructor() {
        this.registerServiceWorker();
        this.setupPWA();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(err => {
                console.log('SW registration failed:', err);
            });
        }
    }

    setupPWA() {
        // Add to home screen prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            // You could show an install button here
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('MyFitTracker installed as PWA');
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
