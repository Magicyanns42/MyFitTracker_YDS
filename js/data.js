// Data Management - LocalStorage
class Database {
    constructor() {
        this.programs = this.loadPrograms();
        this.sessions = this.loadSessions();
        this.weights = this.loadWeights();
        this.currentProgram = this.loadCurrentProgram();
        this.initializeData();
    }

    // Initialize with default programs if empty
    initializeData() {
        if (this.programs.length === 0) {
            this.programs = this.getDefaultPrograms();
            this.savePrograms();
            if (!this.currentProgram) {
                this.currentProgram = this.programs[0];
                this.saveCurrentProgram();
            }
        }
    }

    // Default Programs
    getDefaultPrograms() {
        return [
            {
                id: 1,
                name: "Upper Body - 8 Semaines",
                description: "Programme complet haut du corps",
                duration: 8,
                cycles: [
                    {
                        week: 1,
                        days: [
                            {
                                day: 1,
                                name: "Poitrine & Dos",
                                exercises: [
                                    { id: 1, name: "Bench Press", sets: 4, reps: 8, instructions: "Allongé sur le banc, barres à hauteur poitrine", tips: "Inspirez en descendant, expirez en poussant", tempo: "2-0-1" },
                                    { id: 2, name: "Tractions", sets: 4, reps: 6, instructions: "Prise en pronation, largeur épaules", tips: "Levez les genoux pour plus de difficulté", tempo: "1-1-2" },
                                    { id: 3, name: "Flies à la machine", sets: 3, reps: 12, instructions: "Poitrine contractée", tips: "Amplitude complète", tempo: "2-1-2" }
                                ]
                            },
                            {
                                day: 2,
                                name: "Épaules & Bras",
                                exercises: [
                                    { id: 4, name: "Military Press", sets: 4, reps: 6, instructions: "Haltères au niveau des épaules", tips: "Pas d'arquer le dos", tempo: "2-0-1" },
                                    { id: 5, name: "Lateral Raises", sets: 3, reps: 12, instructions: "Haltères légers, petite flexion coude", tips: "Sentez la contraction", tempo: "2-1-2" },
                                    { id: 6, name: "Biceps Curls", sets: 3, reps: 10, instructions: "Haltères, dos au mur", tips: "Pas de balancement", tempo: "1-1-2" }
                                ]
                            }
                        ]
                    },
                    {
                        week: 2,
                        days: [
                            {
                                day: 1,
                                name: "Poitrine & Dos",
                                exercises: [
                                    { id: 1, name: "Bench Press", sets: 4, reps: 8, instructions: "Allongé sur le banc", tips: "Augmentez le poids", tempo: "2-0-1" },
                                    { id: 2, name: "Tractions", sets: 4, reps: 7, instructions: "Augmentez les répétitions", tips: "Lestage si facile", tempo: "1-1-2" },
                                    { id: 3, name: "Flies à la machine", sets: 3, reps: 12, instructions: "Poitrine contractée", tips: "Amplitude complète", tempo: "2-1-2" }
                                ]
                            },
                            {
                                day: 2,
                                name: "Épaules & Bras",
                                exercises: [
                                    { id: 4, name: "Military Press", sets: 4, reps: 7, instructions: "Augmentez le poids", tips: "Pas d'arquer le dos", tempo: "2-0-1" },
                                    { id: 5, name: "Lateral Raises", sets: 3, reps: 12, instructions: "Augmentez les répétitions", tips: "Sentez la contraction", tempo: "2-1-2" },
                                    { id: 6, name: "Biceps Curls", sets: 3, reps: 11, instructions: "Augmentez les répétitions", tips: "Pas de balancement", tempo: "1-1-2" }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: "Full Body - 6 Semaines",
                description: "Programme complet corps entier",
                duration: 6,
                cycles: [
                    {
                        week: 1,
                        days: [
                            {
                                day: 1,
                                name: "Jour 1 - Full",
                                exercises: [
                                    { id: 7, name: "Squat", sets: 4, reps: 8, instructions: "Profondeur maximale", tips: "Dos droit", tempo: "2-0-1" },
                                    { id: 1, name: "Bench Press", sets: 3, reps: 8, instructions: "Poitrine", tips: "Contrôle", tempo: "2-0-1" },
                                    { id: 2, name: "Tractions", sets: 3, reps: 6, instructions: "Dos", tips: "Lestage si facile", tempo: "1-1-2" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }

    // Save/Load Programs
    savePrograms() {
        localStorage.setItem('programs', JSON.stringify(this.programs));
    }

    loadPrograms() {
        const data = localStorage.getItem('programs');
        return data ? JSON.parse(data) : [];
    }

    // Save/Load Current Program
    saveCurrentProgram() {
        localStorage.setItem('currentProgram', JSON.stringify(this.currentProgram));
    }

    loadCurrentProgram() {
        const data = localStorage.getItem('currentProgram');
        return data ? JSON.parse(data) : null;
    }

    // Save/Load Sessions
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

    // Save/Load Weights
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

    // Program Management
    setCurrentProgram(program) {
        this.currentProgram = program;
        this.saveCurrentProgram();
    }

    getCurrentProgram() {
        return this.currentProgram;
    }

    getPrograms() {
        return this.programs;
    }

    // Statistics
    getStats() {
        return {
            totalSessions: this.sessions.length,
            totalTime: this.sessions.reduce((sum, s) => sum + (s.duration || 0), 0),
            avgWeight: this.getAverageWeight(),
            totalExercises: this.getUniquExercises().length
        };
    }

    getAverageWeight() {
        if (this.weights.length === 0) return 0;
        const sum = this.weights.reduce((sum, w) => sum + w.weight, 0);
        return (sum / this.weights.length).toFixed(1);
    }

    getUniquExercises() {
        const exercises = new Set();
        this.sessions.forEach(session => {
            session.exercises?.forEach(ex => exercises.add(ex.name));
        });
        return Array.from(exercises);
    }

    // Export Data
    exportData() {
        return {
            programs: this.programs,
            sessions: this.sessions,
            weights: this.weights,
            currentProgram: this.currentProgram,
            exportDate: new Date().toISOString()
        };
    }

    // Import Data
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

    // Clear All Data
    clearAllData() {
        localStorage.clear();
        this.programs = this.getDefaultPrograms();
        this.sessions = [];
        this.weights = [];
        this.currentProgram = this.programs[0];
        this.savePrograms();
        this.saveSessions();
        this.saveWeights();
        this.saveCurrentProgram();
    }
}

// Global Database Instance
const db = new Database();
