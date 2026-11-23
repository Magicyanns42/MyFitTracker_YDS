// UI Management
class UI {
    constructor() {
        this.app = document.getElementById('app');
        this.currentScreen = 'home';
        this.currentSession = null;
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.setupEventListeners();
        this.showScreen('home');
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('button, [data-action]');
            if (!target) return;

            const action = target.id || target.dataset.action;
            this.handleAction(action, target);
        });
    }

    handleAction(action, target) {
        const handlers = {
            // Home Screen
            'btn-start-session': () => this.startSession(),
            'btn-select-program': () => this.showScreen('selectProgram'),
            'btn-weight': () => this.showScreen('weightEntry'),
            'btn-stats': () => this.showScreen('stats'),
            'btn-settings': () => this.showScreen('settings'),

            // Program Selection
            'btn-back-home': () => this.showScreen('home'),

            // Active Session
            'btn-back-session': () => this.showScreen('home'),
            'btn-timer-start': () => this.startTimer(),
            'btn-timer-pause': () => this.pauseTimer(),
            'btn-timer-reset': () => this.resetTimer(),
            'btn-finish-session': () => this.finishSession(),
            'btn-abandon-session': () => { if (confirm('Abandonner la session?')) this.showScreen('home'); },

            // Exercise Detail
            'btn-back-exercise': () => this.showExercisesList(),
            'btn-add-set': () => this.addSet(target),
            'btn-next-exercise': () => this.nextExercise(),

            // Weight Entry
            'btn-back-weight': () => this.showScreen('home'),
            'btn-save-weight': () => this.saveWeight(),

            // Stats
            'btn-back-stats': () => this.showScreen('home'),

            // Settings
            'btn-back-settings': () => this.showScreen('home'),
            'btn-export-data': () => this.exportData(),
            'btn-clear-data': () => this.clearData()
        };

        // Handle delete set buttons
        if (action.startsWith('btn-delete-set-')) {
            const setIndex = parseInt(action.split('-').pop());
            this.deleteSet(setIndex);
            return;
        }

        // Handle program selection
        if (action.startsWith('program-')) {
            const programId = parseInt(action.split('-')[1]);
            this.selectProgram(programId);
            return;
        }

        // Handle exercise selection
        if (action.startsWith('exercise-')) {
            const exerciseId = parseInt(action.split('-')[1]);
            this.selectExercise(exerciseId);
            return;
        }

        if (handlers[action]) {
            handlers[action]();
        }
    }

    // Screen Management
    showScreen(screenName) {
        this.currentScreen = screenName;
        this.app.innerHTML = '';

        const screenMap = {
            'home': () => this.renderHome(),
            'selectProgram': () => this.renderSelectProgram(),
            'activeSession': () => this.renderActiveSession(),
            'exerciseDetail': () => this.renderExerciseDetail(),
            'weightEntry': () => this.renderWeightEntry(),
            'stats': () => this.renderStats(),
            'settings': () => this.renderSettings()
        };

        if (screenMap[screenName]) {
            screenMap[screenName]();
        }
    }

    renderHome() {
        const template = document.getElementById('screen-home').cloneNode(true).content;
        
        const program = db.getCurrentProgram();
        const stats = db.getStats();
        const latestWeight = db.getLatestWeight();

        template.getElementById('stat-week').textContent = program ? `Semaine 1/${program.duration}` : '-';
        template.getElementById('stat-sessions').textContent = stats.totalSessions;
        template.getElementById('stat-weight').textContent = latestWeight ? `${latestWeight} kg` : '-';

        this.app.appendChild(template);
    }

    renderSelectProgram() {
        const template = document.getElementById('screen-select-program').cloneNode(true).content;
        const programsList = template.getElementById('programs-list');
        const programs = db.getPrograms();

        programs.forEach(program => {
            const card = document.createElement('div');
            card.className = 'program-card';
            card.id = `program-${program.id}`;
            card.innerHTML = `
                <div class="program-name">${program.name}</div>
                <div class="program-info">
                    <span>${program.duration} semaines</span>
                    <span>${program.cycles[0].days.length} jour(s)/semaine</span>
                </div>
            `;
            programsList.appendChild(card);
        });

        this.app.appendChild(template);
    }

    selectProgram(programId) {
        const program = db.getPrograms().find(p => p.id === programId);
        if (program) {
            db.setCurrentProgram(program);
            this.showScreen('home');
        }
    }

    renderActiveSession() {
        const template = document.getElementById('screen-active-session').cloneNode(true).content;
        const program = db.getCurrentProgram();
        
        if (!program) {
            alert('Veuillez sélectionner un programme');
            this.showScreen('selectProgram');
            return;
        }

        // Get first week, first day exercises
        const week = program.cycles[0];
        const day = week.days[0];
        
        this.currentSession = {
            programId: program.id,
            week: 1,
            day: 1,
            exercises: day.exercises,
            startTime: Date.now(),
            sets: []
        };

        template.getElementById('session-title').textContent = `${day.name}`;
        const exercisesList = template.getElementById('exercises-list');

        day.exercises.forEach((ex, index) => {
            const item = document.createElement('div');
            item.className = 'exercise-item';
            item.id = `exercise-${ex.id}`;
            item.innerHTML = `
                <div class="exercise-info">
                    <h3>${ex.name}</h3>
                    <p>${ex.sets} séries x ${ex.reps} reps</p>
                </div>
                <div class="exercise-sets-count">0/${ex.sets}</div>
            `;
            exercisesList.appendChild(item);
        });

        this.app.appendChild(template);
    }

    startSession() {
        this.showScreen('activeSession');
    }

    selectExercise(exerciseId) {
        if (!this.currentSession) return;
        const exercise = this.currentSession.exercises.find(ex => ex.id === exerciseId);
        if (exercise) {
            this.currentExercise = exercise;
            this.renderExerciseDetail();
        }
    }

    renderExerciseDetail() {
        if (!this.currentExercise) return;

        const template = document.getElementById('screen-exercise-detail').cloneNode(true).content;
        const ex = this.currentExercise;

        template.getElementById('exercise-name').textContent = ex.name;
        template.getElementById('exercise-instructions').textContent = ex.instructions;
        template.getElementById('exercise-tips').textContent = ex.tips;
        template.getElementById('exercise-tempo').textContent = `Tempo: ${ex.tempo}`;

        // Load sets for this exercise
        const setsHistory = template.getElementById('sets-history');
        const sessionSets = this.currentSession.sets.filter(s => s.exerciseId === ex.id);
        
        sessionSets.forEach((set, index) => {
            const item = document.createElement('div');
            item.className = 'set-item';
            item.innerHTML = `
                <div class="set-item-info">
                    <strong>Série ${index + 1}</strong>
                    <div class="set-item-data">
                        ${set.reps} reps × ${set.weight}kg | RPE: ${set.rpe}
                    </div>
                </div>
                <button class="set-delete" id="btn-delete-set-${index}">✕</button>
            `;
            setsHistory.appendChild(item);
        });

        this.app.innerHTML = '';
        this.app.appendChild(template);
    }

    showExercisesList() {
        this.showScreen('activeSession');
    }

    addSet(button) {
        if (!this.currentExercise || !this.currentSession) return;

        const reps = parseInt(document.getElementById('input-reps').value);
        const weight = parseFloat(document.getElementById('input-weight').value);
        const rpe = parseInt(document.getElementById('input-rpe').value);

        if (!reps || !weight || !rpe) {
            alert('Remplissez tous les champs');
            return;
        }

        this.currentSession.sets.push({
            exerciseId: this.currentExercise.id,
            reps,
            weight,
            rpe,
            timestamp: Date.now()
        });

        // Clear inputs
        document.getElementById('input-reps').value = '';
        document.getElementById('input-weight').value = '';
        document.getElementById('input-rpe').value = '';

        // Refresh exercise detail
        this.renderExerciseDetail();
    }

    deleteSet(index) {
        if (this.currentSession.sets[index]) {
            this.currentSession.sets.splice(index, 1);
            this.renderExerciseDetail();
        }
    }

    nextExercise() {
        const currentIndex = this.currentSession.exercises.findIndex(e => e.id === this.currentExercise.id);
        if (currentIndex < this.currentSession.exercises.length - 1) {
            this.currentExercise = this.currentSession.exercises[currentIndex + 1];
            this.renderExerciseDetail();
        } else {
            alert('Dernier exercice atteint');
        }
    }

    finishSession() {
        if (this.currentSession.sets.length === 0) {
            alert('Enregistrez au moins une série');
            return;
        }

        const duration = Math.floor((Date.now() - this.currentSession.startTime) / 1000);
        
        db.addSession({
            ...this.currentSession,
            duration,
            completedSets: this.currentSession.sets.length
        });

        alert(`Session terminée! ${this.currentSession.sets.length} séries enregistrées`);
        this.currentSession = null;
        this.showScreen('home');
    }

    // Weight Management
    renderWeightEntry() {
        const template = document.getElementById('screen-weight-entry').cloneNode(true).content;
        const history = template.getElementById('weight-history');

        const weights = db.getWeights();
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

        db.addWeight(weight);
        alert(`Poids enregistré: ${weight} kg`);
        this.showScreen('home');
    }

    // Statistics
    renderStats() {
        const template = document.getElementById('screen-stats').cloneNode(true).content;
        const stats = db.getStats();

        template.getElementById('stats-total-sessions').textContent = stats.totalSessions;
        template.getElementById('stats-total-time').textContent = `${Math.floor(stats.totalTime / 3600)}h`;
        template.getElementById('stats-avg-weight').textContent = stats.avgWeight ? `${stats.avgWeight} kg` : '-';

        // Weight chart
        const weights = db.getWeights();
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
        }

        // Top exercises
        const exercisesStats = template.getElementById('exercises-stats');
        const sessions = db.getSessions();
        const exerciseCount = {};

        sessions.forEach(session => {
            session.sets?.forEach(set => {
                const exName = session.exercises?.find(e => e.id === set.exerciseId)?.name;
                if (exName) {
                    exerciseCount[exName] = (exerciseCount[exName] || 0) + 1;
                }
            });
        });

        Object.entries(exerciseCount)
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

    // Settings
    renderSettings() {
        const template = document.getElementById('screen-settings').cloneNode(true).content;
        const history = template.getElementById('sessions-history');

        const sessions = db.getSessions();
        sessions.slice().reverse().slice(0, 10).forEach(session => {
            const date = new Date(session.date).toLocaleDateString('fr-FR');
            const time = new Date(session.date).toLocaleTimeString('fr-FR');
            const duration = Math.floor(session.duration / 60);
            
            const item = document.createElement('div');
            item.className = 'session-item';
            item.innerHTML = `
                <div>
                    <strong>${date} ${time}</strong><br>
                    <small>${session.exercises.length} exercices</small>
                </div>
                <span>${duration}m</span>
            `;
            history.appendChild(item);
        });

        this.app.appendChild(template);
    }

    exportData() {
        const data = db.exportData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `myfittracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        alert('Données exportées!');
    }

    clearData() {
        if (confirm('Êtes-vous sûr? Cette action est irréversible!')) {
            if (confirm('Dernière confirmation: TOUT sera effacé!')) {
                db.clearAllData();
                alert('Toutes les données ont été effacées');
                this.showScreen('home');
            }
        }
    }

    // Timer Management
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
        if (!display) return;

        const hours = Math.floor(this.timerSeconds / 3600);
        const minutes = Math.floor((this.timerSeconds % 3600) / 60);
        const seconds = this.timerSeconds % 60;

        display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UI();
});
