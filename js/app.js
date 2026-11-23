// App Initialization & PWA Setup
class App {
    constructor() {
        this.registerServiceWorker();
        console.log('✅ MyFitTracker v1.0.0 Initialized');
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').catch(err => {
                console.log('Service Worker registration skipped:', err.message);
            });
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
