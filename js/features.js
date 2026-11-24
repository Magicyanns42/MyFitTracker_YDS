// Audio & Notification Features
class AudioNotifications {
    constructor() {
        this.audioContext = null;
        this.notificationsEnabled = localStorage.getItem('notificationsEnabled') !== 'false';
        this.audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    // Play beep sound
    beep(frequency = 800, duration = 200, volume = 0.3) {
        if (!this.audioEnabled || !this.audioContext) return;
        
        try {
            const ctx = this.audioContext;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.frequency.value = frequency;
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
            
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration / 1000);
        } catch (e) {
            console.log('Audio playback error:', e.message);
        }
    }

    // Success beep (double)
    successBeep() {
        this.beep(900, 100);
        setTimeout(() => this.beep(1100, 100), 150);
    }

    // Warning beep (warning tone)
    warningBeep() {
        this.beep(600, 150);
    }

    // Rest timer end beep (3 beeps)
    restEndBeep() {
        this.beep(1200, 100);
        setTimeout(() => this.beep(1200, 100), 150);
        setTimeout(() => this.beep(1200, 150), 300);
    }

    // Send browser notification
    notify(title, options = {}) {
        if (!this.notificationsEnabled || !('Notification' in window)) return;

        if (Notification.permission === 'granted') {
            new Notification(title, {
                icon: './assets/icon-192x192.png',
                badge: './assets/badge-72x72.png',
                ...options
            });
        }
    }

    // Session notifications
    notifySessionEnd(programName, duration) {
        this.notify('✅ Session Terminée!', {
            body: `${programName} - ${duration}`,
            tag: 'session-end'
        });
    }

    notifyRestTime(seconds) {
        this.notify(`⏱️ Repos: ${seconds}s`, {
            tag: 'rest-time'
        });
    }

    notifyDayReminder(program) {
        this.notify('💪 Entraînement du jour!', {
            body: `${program} - Êtes-vous prêt?`,
            tag: 'daily-reminder'
        });
    }

    // Request notification permission
    static requestPermission() {
        if (!('Notification' in window)) return;
        
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Smart Rest Timer Feature
class SmartRestTimer {
    constructor() {
        this.enabled = localStorage.getItem('smartRestEnabled') !== 'false';
        this.autoStart = localStorage.getItem('restAutoStart') === 'true';
        this.notifications = new AudioNotifications();
        this.currentRest = null;
        this.restInterval = null;
    }

    startRest(seconds, callback) {
        if (!this.enabled) return;

        let remaining = seconds;
        this.currentRest = {
            total: seconds,
            remaining: remaining,
            callback: callback
        };

        // Show UI for rest timer
        this.updateRestUI(remaining);

        this.restInterval = setInterval(() => {
            remaining--;
            this.updateRestUI(remaining);

            // Audio cue at 10, 5, 3, 2, 1 seconds
            if ([10, 5, 3, 2, 1].includes(remaining)) {
                this.notifications.beep(700, 100);
            }

            if (remaining <= 0) {
                clearInterval(this.restInterval);
                this.notifications.restEndBeep();
                this.currentRest = null;
                
                if (callback) callback();
            }
        }, 1000);
    }

    updateRestUI(remaining) {
        const restDisplay = document.getElementById('rest-timer-display');
        if (restDisplay) {
            restDisplay.textContent = `Repos: ${remaining}s`;
            restDisplay.classList.toggle('warning', remaining <= 5);
        }
    }

    stop() {
        if (this.restInterval) {
            clearInterval(this.restInterval);
            this.restInterval = null;
            this.currentRest = null;
        }
    }
}

// GraphicsEngine for Stats
class GraphicsEngine {
    static createProgressChart(canvasId, exerciseName, sessionHistory) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = sessionHistory
            .filter(s => s.exercises.some(e => e.name === exerciseName))
            .map(s => ({
                date: new Date(s.date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
                weight: s.exercises.find(e => e.name === exerciseName)?.weight || 0
            }));

        this.drawSimpleChart(ctx, data, canvas.width, canvas.height);
    }

    static drawSimpleChart(ctx, data, width, height) {
        if (data.length === 0) return;

        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;

        const maxWeight = Math.max(...data.map(d => d.weight));
        const stepX = chartWidth / (data.length - 1 || 1);

        // Draw axes
        ctx.strokeStyle = '#666';
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // Draw line
        ctx.strokeStyle = '#6200EE';
        ctx.lineWidth = 2;
        ctx.beginPath();

        data.forEach((point, i) => {
            const x = padding + i * stepX;
            const y = height - padding - (point.weight / maxWeight) * chartHeight;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Draw points
        ctx.fillStyle = '#6200EE';
        data.forEach((point, i) => {
            const x = padding + i * stepX;
            const y = height - padding - (point.weight / maxWeight) * chartHeight;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        data.forEach((point, i) => {
            const x = padding + i * stepX;
            ctx.fillText(point.date, x, height - 10);
        });
    }
}

// Initialize global instances
window.audioNotifications = new AudioNotifications();
window.smartRestTimer = new SmartRestTimer();
window.graphicsEngine = new GraphicsEngine();
