// Database Management with LocalStorage
class Database {
    constructor() {
        this.programs = this.loadPrograms();
        this.sessions = this.loadSessions();
        this.weights = this.loadWeights();
        this.currentProgram = this.loadCurrentProgram();
        this.initializeData();
    }

    initializeData() {
        if (this.programs.length === 0) {
            this.programs = PROGRAMS;
            this.savePrograms();
            if (!this.currentProgram) {
                this.currentProgram = PROGRAMS[0];
                this.saveCurrentProgram();
            }
        }
    }

    // Program Management
    savePrograms() {
        localStorage.setItem('programs', JSON.stringify(this.programs));
    }

    loadPrograms() {
        const data = localStorage.getItem('programs');
        return data ? JSON.parse(data) : [];
    }

    setCurrentProgram(program) {
        this.currentProgram = program;
        this.saveCurrentProgram();
    }

    saveCurrentProgram() {
        localStorage.setItem('currentProgram', JSON.stringify(this.currentProgram));
    }

    loadCurrentProgram() {
        const data = localStorage.getItem('currentProgram');
        return data ? JSON.parse(data) : null;
    }

    getCurrentProgram() {
        return this.currentProgram;
    }

    getPrograms() {
        return this.programs;
    }

    getExerciseById(id) {
        return EXERCISES_DATABASE[id];
    }

    // Session Management
    saveSessions() {
        localStorage.setItem('sessions', JSON.stringify(this.sessions));
    }

    loadSessions() {
        const data = localStorage.getItem('sessions');
        return data ? JSON.parse(data) : [];
    }

    addSession(session) {
        this.sessions.push({
            ...session,
            id: Date.now(),
            date: new Date().toISOString(),
            completed: true
        });
        this.saveSessions();
    }

    getSessions() {
        return this.sessions;
    }

    getRecentSessions(limit = 10) {
        return this.sessions.slice().reverse().slice(0, limit);
    }

    // Weight Management
    saveWeights() {
        localStorage.setItem('weights', JSON.stringify(this.weights));
    }

    loadWeights() {
        const data = localStorage.getItem('weights');
        return data ? JSON.parse(data) : [];
    }

    addWeight(weight) {
        this.weights.push({
            weight,
            date: new Date().toISOString()
        });
        this.saveWeights();
    }

    getWeights() {
        return this.weights;
    }

    getLatestWeight() {
        if (this.weights.length === 0) return null;
        return this.weights[this.weights.length - 1].weight;
    }

    // Statistics
    getStats() {
        return {
            totalSessions: this.sessions.length,
            totalTime: this.sessions.reduce((sum, s) => sum + (s.duration || 0), 0),
            avgWeight: this.getAverageWeight(),
            totalExercises: this.getUniqueExercises().length,
            totalSets: this.getTotalSets()
        };
    }

    getAverageWeight() {
        if (this.weights.length === 0) return 0;
        const sum = this.weights.reduce((sum, w) => sum + w.weight, 0);
        return (sum / this.weights.length).toFixed(1);
    }

    getUniqueExercises() {
        const exercises = new Set();
        this.sessions.forEach(session => {
            session.exercises?.forEach(ex => {
                const exData = this.getExerciseById(ex.id);
                if (exData) exercises.add(exData.name);
            });
        });
        return Array.from(exercises);
    }

    getTotalSets() {
        return this.sessions.reduce((sum, s) => sum + (s.sets?.length || 0), 0);
    }

    getExerciseStats() {
        const stats = {};
        this.sessions.forEach(session => {
            session.sets?.forEach(set => {
                const exData = this.getExerciseById(set.exerciseId);
                if (exData) {
                    if (!stats[exData.name]) {
                        stats[exData.name] = 0;
                    }
                    stats[exData.name]++;
                }
            });
        });
        return stats;
    }

    // Data Export/Import
    exportData() {
        return {
            programs: this.programs,
            sessions: this.sessions,
            weights: this.weights,
            currentProgram: this.currentProgram,
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
    }

    importData(data) {
        if (data.programs) this.programs = data.programs;
        if (data.sessions) this.sessions = data.sessions;
        if (data.weights) this.weights = data.weights;
        if (data.currentProgram) this.currentProgram = data.currentProgram;
        this.savePrograms();
        this.saveSessions();
        this.saveWeights();
        this.saveCurrentProgram();
    }

    clearAllData() {
        localStorage.clear();
        this.programs = PROGRAMS;
        this.sessions = [];
        this.weights = [];
        this.currentProgram = PROGRAMS[0];
        this.savePrograms();
        this.saveSessions();
        this.saveWeights();
        this.saveCurrentProgram();
    }
}

// Global Database Instance
const db = new Database();
