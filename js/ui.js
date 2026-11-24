// UI Management System
class UI {
    constructor() {
        this.app = document.getElementById('app');
        this.currentScreen = 'home';
        this.currentSession = null;
        this.currentExercise = null;
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Event delegation - works on dynamically created elements
        document.addEventListener('click', (e) => {
            // Check buttons first
            let target = e.target.closest('button');
            
            // Check program cards
            if (!target) target = e.target.closest('[id^="program-"]');
            
            // Check exercise items
            if (!target) target = e.target.closest('[id^="exercise-"]');
            
            if (!target) return;
            
            const action = target.id;
            if (!action) return;
            
            this.handleAction(action, target);
        });

        // Handle checkbox/toggle changes
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox' && e.target.id) {
                this.handleAction(e.target.id, e.target);
            }
            // Handle number inputs for settings
            if (e.target.type === 'number' && e.target.id === 'input-rest-time') {
                this.updateRestTime(e.target.value);
            }
        });
    }

    handleAction(action, target) {
        console.log('🔔 Action triggered:', action, target);
        
        const handlers = {
            // Home
            'btn-start-session': () => this.startSession(),
            'btn-select-program': () => this.showScreen('selectProgram'),
            'btn-weight': () => this.showScreen('weightEntry'),
            'btn-stats': () => this.showScreen('stats'),
            'btn-settings': () => this.showScreen('settings'),
            'btn-manual': () => this.showScreen('manual'),

            // Navigation
            'btn-back-home': () => this.showScreen('home'),
            'btn-back-session': () => this.showScreen('home'),
            'btn-back-exercise': () => this.showExercisesList(),
            'btn-back-weight': () => this.showScreen('home'),
            'btn-back-stats': () => this.showScreen('home'),
            'btn-back-settings': () => this.showScreen('home'),
            'btn-back-manual': () => this.showScreen('home'),

            // Session Timer
            'btn-timer-start': () => this.startTimer(),
            'btn-timer-pause': () => this.pauseTimer(),
            'btn-timer-reset': () => this.resetTimer(),
            
            // Exercise Timer
            'btn-timer-start-ex': () => this.startTimer(),
            'btn-timer-pause-ex': () => this.pauseTimer(),
            'btn-timer-reset-ex': () => this.resetTimer(),
            
            // Session
            'btn-finish-session': () => this.finishSession(),
            'btn-abandon-session': () => { 
                if (confirm('Abandonner la session?')) this.showScreen('home');
            },

            // Exercise
            'btn-add-set': () => this.addSet(),
            'btn-next-exercise': () => this.nextExercise(),
            'btn-finish-session-exercise': () => this.finishSession(),

            // Weight
            'btn-save-weight': () => this.saveWeight(),

            // Settings
            'btn-export-data': () => this.exportData(),
            'btn-clear-data': () => this.clearData(),
            'btn-backup-now': () => this.backupNow(),
            'btn-request-notification-perm': () => AudioNotifications.requestPermission(),
            'btn-stop-rest': () => this.stopRest(),
            'toggle-dark-mode': (el) => {
                console.log('🔧 toggle-dark-mode handler called');
                if (el) {
                    console.log('  el.checked:', el.checked);
                    this.toggleDarkMode(el.checked);
                }
            },
            'toggle-audio': (el) => el && this.toggleAudio(el.checked),
            'toggle-notifications': (el) => el && this.toggleNotifications(el.checked),
            'toggle-smart-rest': (el) => el && this.toggleSmartRest(el.checked),
            'toggle-rest-auto-start': (el) => el && this.toggleRestAutoStart(el.checked),
            'input-rest-time': (el) => el && this.updateRestTime(el.value)
        };

        // Handle delete set buttons
        if (action.startsWith('btn-delete-set-')) {
            const setIndex = parseInt(action.split('-').pop());
            console.log('🗑️ Deleting set:', setIndex);
            this.deleteSet(setIndex);
            return;
        }

        // Handle program selection
        if (action.startsWith('program-')) {
            const programId = parseInt(action.split('-')[1]);
            console.log('📋 Program selected:', programId);
            this.selectProgram(programId);
            return;
        }

        // Handle exercise selection
        if (action.startsWith('exercise-')) {
            const exerciseId = parseInt(action.split('-')[1]);
            console.log('🏋️ Exercise selected:', exerciseId);
            this.selectExercise(exerciseId);
            return;
        }

        if (handlers[action]) {
            console.log('✅ Handler executed for:', action);
            // For toggle handlers, also pass target
            if (action.startsWith('toggle-') || action === 'input-rest-time') {
                handlers[action](target);
            } else {
                handlers[action]();
            }
        } else {
            console.warn('⚠️ No handler found for:', action);
        }
    }

    // Screen Management
    showScreen(screenName) {
        this.currentScreen = screenName;
        this.app.innerHTML = '';
        this.pauseTimer();

        const screenMap = {
            'home': () => this.renderHome(),
            'selectProgram': () => this.renderSelectProgram(),
            'activeSession': () => this.renderActiveSession(),
            'exerciseDetail': () => this.renderExerciseDetail(),
            'weightEntry': () => this.renderWeightEntry(),
            'stats': () => this.renderStats(),
            'settings': () => this.renderSettings(),
            'manual': () => this.renderManual()
        };

        if (screenMap[screenName]) {
            screenMap[screenName]();
        }
    }

    // HOME SCREEN
    renderHome() {
        const template = document.getElementById('screen-home').cloneNode(true).content;
        const program = window.db.getCurrentProgram();
        const stats = window.db.getStats();
        const latestWeight = window.db.getLatestWeight();

        template.getElementById('stat-week').textContent = program ? `1/${program.duration}` : '-';
        template.getElementById('stat-sessions').textContent = stats.totalSessions;
        template.getElementById('stat-weight').textContent = latestWeight ? `${latestWeight}` : '-';
        template.getElementById('program-name').textContent = program ? program.name : 'Aucun programme';

        this.app.appendChild(template);
    }

    // PROGRAM SELECTION
    renderSelectProgram() {
        const template = document.getElementById('screen-select-program').cloneNode(true).content;
        const programsList = template.getElementById('programs-list');
        const programs = window.db.getPrograms();

        console.log('📚 Rendering programs:', programs.length, 'programs');

        programs.forEach(program => {
            console.log(`📝 Creating card for program:`, { id: program.id, name: program.name });
            
            const card = document.createElement('div');
            card.className = 'program-card';
            card.id = `program-${program.id}`;
            card.style.cursor = 'pointer';  // Make clickable
            card.innerHTML = `
                <div class="program-name">${program.name}</div>
                <div class="program-info">
                    <span>⏱️ ${program.duration} semaines</span>
                    <span>📋 ${program.cycles.length} cycles</span>
                </div>
                <p style="font-size: 12px; color: #757575; margin-top: 8px;">${program.description}</p>
            `;
            programsList.appendChild(card);
            console.log(`✅ Card created with id: program-${program.id}`);
        });

        this.app.appendChild(template);
        console.log('✅ Programs screen rendered');
    }

    selectProgram(programId) {
        console.log('📋 selectProgram called with ID:', programId);
        const programs = window.db.getPrograms();
        console.log('📚 Available programs:', programs.map(p => ({ id: p.id, name: p.name })));
        
        const program = programs.find(p => p.id === programId);
        console.log('🔍 Found program:', program);
        
        if (program) {
            window.db.setCurrentProgram(program);
            console.log('✅ Program set:', program.name);
            this.showScreen('home');
        } else {
            console.error('❌ Program not found:', programId);
        }
    }

    // ACTIVE SESSION
    renderActiveSession() {
        const template = document.getElementById('screen-active-session').cloneNode(true).content;
        
        // Only initialize session if it doesn't exist yet
        if (!this.currentSession) {
            const program = window.db.getCurrentProgram();
            
            console.log('📋 Current program:', program);
            
            if (!program) {
                console.error('❌ No program selected!');
                alert('Veuillez sélectionner un programme');
                this.showScreen('selectProgram');
                return;
            }

            const week = program.cycles[0];
            const day = week.days[0];
            
            console.log('📅 Starting session:', { week: week.week, day: day.name, exercises: day.exercises });
            
            this.currentSession = {
                programId: program.id,
                week: 1,
                day: 1,
                dayName: day.name,
                exercises: day.exercises,
                startTime: Date.now(),
                sets: []
            };
        }

        const day = window.db.getCurrentProgram().cycles[0].days[0];
        template.getElementById('session-title').textContent = day.name;
        const exercisesList = template.getElementById('exercises-list');

        day.exercises.forEach((exId) => {
            const ex = window.db.getExerciseById(exId);
            console.log(`💪 Adding exercise:`, { id: exId, name: ex ? ex.name : '???' });
            
            if (!ex) {
                console.error(`❌ Exercise ${exId} not found!`);
                return;
            }
            
            // Count sets for this exercise in the current session
            const exerciseSets = this.currentSession.sets.filter(s => s.exerciseId === exId).length;
            
            const item = document.createElement('div');
            item.className = 'exercise-item';
            item.id = `exercise-${exId}`;
            item.style.cursor = 'pointer';  // Make clickable
            item.innerHTML = `
                <div class="exercise-info">
                    <h3>${ex.name}</h3>
                    <p>${ex.sets} séries x ${ex.reps} reps</p>
                </div>
                <div class="exercise-sets-count">${exerciseSets}/${ex.sets}</div>
            `;
            exercisesList.appendChild(item);
        });

        this.app.appendChild(template);
    }

    startSession() {
        this.showScreen('activeSession');
    }

    selectExercise(exerciseId) {
        console.log('🏋️ selectExercise called with:', exerciseId);
        
        if (!this.currentSession) {
            console.error('❌ No currentSession!');
            return;
        }
        
        const exercise = window.db.getExerciseById(exerciseId);
        console.log('🔍 Found exercise:', exercise);
        
        if (exercise) {
            this.currentExercise = exercise;
            console.log('✅ currentExercise set to:', exercise.name);
            this.renderExerciseDetail();
        } else {
            console.error('❌ Exercise not found:', exerciseId);
        }
    }

    // EXERCISE DETAIL
    renderExerciseDetail() {
        if (!this.currentExercise) return;

        const template = document.getElementById('screen-exercise-detail').cloneNode(true).content;
        const ex = this.currentExercise;

        template.getElementById('exercise-name').textContent = ex.name;
        template.getElementById('exercise-instructions').textContent = ex.instructions;
        template.getElementById('exercise-tips').textContent = ex.tips;
        template.getElementById('exercise-tempo').textContent = ex.tempo;
        template.getElementById('exercise-target').textContent = `${ex.targetMuscles} • Difficulté: ${ex.difficulty}`;

    // Animation SVG or Image
        const animation = template.getElementById('exercise-animation');
        if (ex.image) {
            animation.innerHTML = `<img src="${ex.image}" alt="${ex.name}" style="width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px; padding: 8px;">`;
        } else {
            animation.innerHTML = SVGAnimations.getAnimationForExercise(ex.id);
        }

        // Load sets
        const setsHistory = template.getElementById('sets-history');
        const sessionSets = this.currentSession.sets.filter(s => s.exerciseId === ex.id);
        
        sessionSets.forEach((set, index) => {
            const item = document.createElement('div');
            item.className = 'set-item';
            item.innerHTML = `
                <div class="set-item-info">
                    <strong>Série ${index + 1}</strong>
                    <div class="set-item-data">
                        ${set.reps} reps × ${set.weight}kg | RPE: ${set.rpe}/10
                    </div>
                </div>
                <button class="set-delete" id="btn-delete-set-${index}">✕</button>
            `;
            setsHistory.appendChild(item);
        });

        // Check if this is the last exercise
        const currentIndex = this.currentSession.exercises.indexOf(this.currentExercise.id);
        const isLastExercise = currentIndex === this.currentSession.exercises.length - 1;
        
        // Update button text based on position
        const nextBtn = template.getElementById('btn-next-exercise');
        if (isLastExercise) {
            nextBtn.textContent = '✓ Terminer la Session';
            nextBtn.className = 'btn btn-success btn-lg';
            nextBtn.id = 'btn-finish-session-exercise';
        } else {
            nextBtn.textContent = 'Exercice Suivant →';
            nextBtn.className = 'btn btn-secondary btn-lg';
            nextBtn.id = 'btn-next-exercise';
        }

        this.app.innerHTML = '';
        this.app.appendChild(template);
    }

    showExercisesList() {
        this.showScreen('activeSession');
    }

    addSet() {
        if (!this.currentExercise || !this.currentSession) {
            console.error('❌ No exercise or session', this.currentExercise, this.currentSession);
            return;
        }

        const repsVal = document.getElementById('input-reps').value;
        const weightVal = document.getElementById('input-weight').value;
        const rpeVal = document.getElementById('input-rpe').value;

        console.log('📝 Set values:', {repsVal, weightVal, rpeVal});

        const reps = parseInt(repsVal);
        const weight = parseFloat(weightVal);
        const rpe = parseInt(rpeVal);

        console.log('📝 Parsed:', {reps, weight, rpe});

        if (!reps || isNaN(weight) || !rpe) {
            alert('Remplissez tous les champs correctement');
            console.error('❌ Invalid values:', {reps, weight, rpe});
            return;
        }

        this.currentSession.sets.push({
            exerciseId: this.currentExercise.id,
            reps,
            weight,
            rpe,
            timestamp: Date.now()
        });

        console.log('✅ Set added! Total sets:', this.currentSession.sets.length);

        // Play success beep
        window.audioNotifications.successBeep();

        document.getElementById('input-reps').value = '';
        document.getElementById('input-weight').value = '';
        document.getElementById('input-rpe').value = '';

        this.renderExerciseDetail();

        // Auto-start rest timer if enabled AFTER rendering
        const restTime = parseInt(localStorage.getItem('defaultRestTime') || '90');
        if (window.smartRestTimer.enabled) {
            setTimeout(() => {
                const restCard = document.getElementById('rest-timer-card');
                if (restCard) {
                    restCard.style.display = 'block';
                    window.smartRestTimer.startRest(restTime, () => {
                        const restCard2 = document.getElementById('rest-timer-card');
                        if (restCard2) restCard2.style.display = 'none';
                        window.audioNotifications.notify('💪 Prêt pour la prochaine série!', {
                            tag: 'next-set'
                        });
                    });
                }
            }, 150);
        }
    }

    deleteSet(index) {
        const sessionSets = this.currentSession.sets.filter(s => s.exerciseId === this.currentExercise.id);
        if (sessionSets[index]) {
            const globalIndex = this.currentSession.sets.findIndex(s => s === sessionSets[index]);
            this.currentSession.sets.splice(globalIndex, 1);
            this.renderExerciseDetail();
        }
    }

    nextExercise() {
        const currentIndex = this.currentSession.exercises.indexOf(this.currentExercise.id);
        if (currentIndex < this.currentSession.exercises.length - 1) {
            const nextExId = this.currentSession.exercises[currentIndex + 1];
            this.currentExercise = window.db.getExerciseById(nextExId);
            this.renderExerciseDetail();
        }
    }

    finishSession() {
        if (this.currentSession.sets.length === 0) {
            alert('Enregistrez au moins une série');
            return;
        }

        const duration = Math.floor((Date.now() - this.currentSession.startTime) / 1000);
        
        window.db.addSession({
            ...this.currentSession,
            duration,
            completedSets: this.currentSession.sets.length
        });

        const minutes = Math.floor(duration / 60);
        
        // Play success sound
        window.audioNotifications.successBeep();
        
        // Send notification
        window.audioNotifications.notifySessionEnd(
            this.currentSession.programName,
            `${minutes}m - ${this.currentSession.sets.length} séries`
        );

        alert(`✅ Session terminée!\n${this.currentSession.sets.length} séries enregistrées\nDurée: ${minutes}m`);
        this.currentSession = null;
        this.showScreen('home');
    }

    // WEIGHT ENTRY
    renderWeightEntry() {
        const template = document.getElementById('screen-weight-entry').cloneNode(true).content;
        const history = template.getElementById('weight-history');

        const weights = window.db.getWeights();
        weights.slice().reverse().forEach(w => {
            const item = document.createElement('div');
            item.className = 'weight-item';
            const date = new Date(w.date).toLocaleDateString('fr-FR');
            item.innerHTML = `
                <span>${date}</span>
                <span class="weight-value">${w.weight} kg</span>
            `;
            history.appendChild(item);
        });

        this.app.appendChild(template);
    }

    saveWeight() {
        const weight = parseFloat(document.getElementById('weight-input').value);
        if (!weight || weight <= 0) {
            alert('Entrez un poids valide');
            return;
        }

        window.db.addWeight(weight);
        alert(`✅ Poids enregistré: ${weight} kg`);
        this.showScreen('home');
    }

    // STATISTICS
    renderStats() {
        const template = document.getElementById('screen-stats').cloneNode(true).content;
        const stats = window.db.getStats();

        template.getElementById('stats-total-sessions').textContent = stats.totalSessions;
        template.getElementById('stats-total-time').textContent = `${Math.floor(stats.totalTime / 3600)}h`;
        template.getElementById('stats-avg-weight').textContent = stats.avgWeight ? `${stats.avgWeight} kg` : '-';

        // Weight chart
        const weights = window.db.getWeights();
        const chartContainer = template.getElementById('weight-chart');
        
        if (weights.length > 0) {
            const minWeight = Math.min(...weights.map(w => w.weight));
            const maxWeight = Math.max(...weights.map(w => w.weight));
            const range = maxWeight - minWeight || 1;

            weights.slice(-10).forEach(w => {
                const bar = document.createElement('div');
                bar.className = 'chart-bar';
                const height = ((w.weight - minWeight) / range) * 100 + 20;
                bar.style.height = `${height}px`;
                bar.title = `${w.weight}kg`;
                chartContainer.appendChild(bar);
            });
        } else {
            chartContainer.innerHTML = '<p style="text-align:center; padding:20px; color:#999;">Aucune donnée de poids</p>';
        }

        // Top exercises
        const exercisesStats = template.getElementById('exercises-stats');
        const exStats = window.db.getExerciseStats();

        Object.entries(exStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .forEach(([name, count]) => {
                const item = document.createElement('div');
                item.className = 'exercise-stat-item';
                item.innerHTML = `<span>${name}</span><span>${count} séries</span>`;
                exercisesStats.appendChild(item);
            });

        this.app.appendChild(template);
    }

    // SETTINGS
    renderSettings() {
        const template = document.getElementById('screen-settings').cloneNode(true).content;
        const history = template.getElementById('sessions-history');

        const sessions = window.db.getRecentSessions(10);
        sessions.forEach(session => {
            const date = new Date(session.date).toLocaleDateString('fr-FR');
            const time = new Date(session.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            const duration = Math.floor(session.duration / 60);
            
            const item = document.createElement('div');
            item.className = 'session-item';
            item.innerHTML = `
                <div>
                    <strong>${date} ${time}</strong>
                    <small>${session.dayName || 'Session'}</small>
                </div>
                <span>${duration}m</span>
            `;
            history.appendChild(item);
        });

        // Dark mode toggle
        const darkToggle = template.getElementById('toggle-dark-mode');
        if (darkToggle) {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            darkToggle.checked = isDarkMode;
        }

        // Audio toggle
        const audioToggle = template.getElementById('toggle-audio');
        if (audioToggle) {
            audioToggle.checked = localStorage.getItem('audioEnabled') !== 'false';
        }

        // Notifications toggle
        const notifToggle = template.getElementById('toggle-notifications');
        if (notifToggle) {
            notifToggle.checked = localStorage.getItem('notificationsEnabled') !== 'false';
        }

        // Smart Rest toggle
        const restToggle = template.getElementById('toggle-smart-rest');
        if (restToggle) {
            restToggle.checked = localStorage.getItem('smartRestEnabled') !== 'false';
        }

        // Rest Auto Start toggle
        const restAutoToggle = template.getElementById('toggle-rest-auto-start');
        if (restAutoToggle) {
            restAutoToggle.checked = localStorage.getItem('restAutoStart') === 'true';
        }

        // Rest time input
        const restTimeInput = template.getElementById('input-rest-time');
        if (restTimeInput) {
            restTimeInput.value = localStorage.getItem('defaultRestTime') || '90';
        }

        // Backup status
        const backupStatus = template.getElementById('backup-status');
        const lastBackup = localStorage.getItem('lastBackup');
        if (lastBackup && backupStatus) {
            const date = new Date(parseInt(lastBackup));
            backupStatus.textContent = `✅ Dernière sauvegarde: ${date.toLocaleString('fr-FR')}`;
        }

        this.app.appendChild(template);
    }

    // MANUAL SCREEN
    renderManual() {
        const template = document.getElementById('screen-manual').cloneNode(true).content;
        this.app.appendChild(template);
    }

    exportData() {
        const data = window.db.exportData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `myfittracker-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        alert('✅ Données exportées!');
    }

    clearData() {
        if (confirm('Êtes-vous sûr? Toutes les données seront effacées!')) {
            if (confirm('DERNIÈRE CONFIRMATION - Cette action est irréversible!')) {
                window.db.clearAllData();
                alert('✅ Données effacées');
                this.showScreen('home');
            }
        }
    }

    // TIMER
    startTimer() {
        if (this.timerInterval) return;
        this.timerInterval = setInterval(() => {
            this.timerSeconds++;
            this.updateTimerDisplay();
        }, 1000);
    }

    pauseTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.timerSeconds = 0;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const display = document.getElementById('timer-display');
        const displayEx = document.getElementById('timer-display-exercise');
        
        const hours = Math.floor(this.timerSeconds / 3600);
        const minutes = Math.floor((this.timerSeconds % 3600) / 60);
        const seconds = this.timerSeconds % 60;
        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (display) display.textContent = timeString;
        if (displayEx) displayEx.textContent = timeString;
    }

    // Dark Mode Toggle
    toggleDarkMode(enabled) {
        console.log('🌙 toggleDarkMode:', enabled);
        
        if (enabled) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
        
        localStorage.setItem('darkMode', enabled ? 'true' : 'false');
        console.log('✅ Toggled. Dark mode now:', document.documentElement.classList.contains('dark-mode'));
    }

    // Backup Now
    backupNow() {
        this.exportData();
        const now = Date.now();
        localStorage.setItem('lastBackup', now.toString());
        alert('✅ Sauvegarde créée!');
        
        // Update backup status
        const backupStatus = document.getElementById('backup-status');
        if (backupStatus) {
            const date = new Date(now);
            backupStatus.textContent = `✅ Dernière sauvegarde: ${date.toLocaleString('fr-FR')}`;
        }
    }

    // Audio settings
    toggleAudio(enabled) {
        localStorage.setItem('audioEnabled', enabled ? 'true' : 'false');
        window.audioNotifications.audioEnabled = enabled;
        window.audioNotifications.beep();
    }

    toggleNotifications(enabled) {
        localStorage.setItem('notificationsEnabled', enabled ? 'true' : 'false');
        window.audioNotifications.notificationsEnabled = enabled;
        if (enabled) {
            window.audioNotifications.notify('✅ Notifications Activées!', {tag: 'settings'});
        }
    }

    toggleSmartRest(enabled) {
        localStorage.setItem('smartRestEnabled', enabled ? 'true' : 'false');
        window.smartRestTimer.enabled = enabled;
    }

    toggleRestAutoStart(enabled) {
        localStorage.setItem('restAutoStart', enabled ? 'true' : 'false');
        window.smartRestTimer.autoStart = enabled;
    }

    updateRestTime(value) {
        const seconds = Math.max(30, Math.min(300, parseInt(value) || 90));
        localStorage.setItem('defaultRestTime', seconds.toString());
        const input = document.getElementById('input-rest-time');
        if (input) input.value = seconds;
    }

    stopRest() {
        window.smartRestTimer.stop();
        const restCard = document.getElementById('rest-timer-card');
        if (restCard) restCard.style.display = 'none';
    }
}

// Don't initialize here - App.js handles it


