// App Initialization & PWA Setup
class App {
    constructor() {
        this.registerServiceWorker();
        // Initialize Database and UI
        window.db = new Database();
        window.ui = new UI();
        console.log('✅ MyFitTracker v1.0.0 Initialized');
        console.log('🗄️ Database ready, UI loaded');
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
