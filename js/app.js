// App Initialization & PWA Setup
class App {
    constructor() {
        this.registerServiceWorker();
        this.setupAutoBackup();
        // Initialize Database and UI
        window.db = new Database();
        
        // DEBUG: Check programs loaded
        const programs = window.db.getPrograms();
        console.log('✅ MyFitTracker v1.0.0 Initialized');
        console.log('🗄️ Database ready, UI loaded');
        console.log(`📚 Programmes chargés: ${programs.length}`);
        programs.forEach((p, idx) => {
            console.log(`   ${idx + 1}. ${p.name}`);
        });
        
        window.ui = new UI();
        // Initialize dark mode AFTER UI is created
        this.initializeDarkMode();
        window.ui.showScreen('home');
    }

    initializeDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode');
        // Dark mode is DISABLED by default
        if (isDarkMode === 'true') {
            document.documentElement.classList.add('dark-mode');
            console.log('🌙 Dark mode enabled on startup');
        } else {
            document.documentElement.classList.remove('dark-mode');
            console.log('☀️ Light mode enabled on startup');
            if (isDarkMode === null) {
                localStorage.setItem('darkMode', 'false');
            }
        }
    }

    setupAutoBackup() {
        // Auto backup once per day at midnight
        const checkBackup = () => {
            const lastBackup = localStorage.getItem('lastBackup');
            const now = Date.now();
            const oneDayMs = 24 * 60 * 60 * 1000;
            
            if (!lastBackup || now - parseInt(lastBackup) > oneDayMs) {
                this.performBackup();
            }
        };
        
        checkBackup();
        setInterval(checkBackup, 60 * 60 * 1000); // Check every hour
    }

    performBackup() {
        if (window.db) {
            const data = window.db.exportData();
            const json = JSON.stringify(data, null, 2);
            localStorage.setItem('autoBackup-' + new Date().toISOString().split('T')[0], json);
            localStorage.setItem('lastBackup', Date.now().toString());
            console.log('✅ Auto backup completed');
        }
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
