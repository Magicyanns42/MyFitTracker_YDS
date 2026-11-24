// Detailed Exercises Database with Images from Programme
const EXERCISES_DATABASE = {
    // SEANCE A EXERCISES
    101: {
        id: 101,
        name: "Dumbbell Bench Press - Couché au Sol",
        emoji: "🏋️",
        sets: 3,
        reps: 10,
        image: "images/seance-a-01-bench-press.png",
        instructions: "Allongé au sol, haltères au niveau de la poitrine. Poussez les haltères vers le haut jusqu'à extension complète.",
        tips: "Inspirez en descendant, expirez en poussant. Gardez les coudes à 45° du corps.",
        tempo: "2 secondes en descente - 1 seconde en montée",
        targetMuscles: "Pectoraux, triceps, épaules",
        difficulty: "Intermédiaire"
    },
    102: {
        id: 102,
        name: "Dumbbell Shoulder Press",
        emoji: "⬆️",
        sets: 3,
        reps: 10,
        image: "images/seance-a-02-shoulder-press.png",
        instructions: "Assis ou debout, haltères au niveau des épaules. Poussez vers le haut jusqu'à extension complète.",
        tips: "Pas d'arquer excessivement le dos. Core bien engagé.",
        tempo: "2 secondes en descente - 1 seconde en montée",
        targetMuscles: "Épaules, triceps, haut poitrine",
        difficulty: "Intermédiaire"
    },
    103: {
        id: 103,
        name: "Lateral Raises - Élévations Latérales",
        emoji: "📐",
        sets: 4,
        reps: 12,
        image: "images/seance-a-03-lateral-raises.png",
        instructions: "Debout, légers haltères au niveau des hanches. Levez les haltères sur les côtés jusqu'à la hauteur des épaules.",
        tips: "Évitez les haltères trop lourds. Sentez la contraction en haut.",
        tempo: "2 secondes en montée - 1 seconde en haut - 2 secondes en descente",
        targetMuscles: "Épaules (deltoïdes latéraux)",
        difficulty: "Débutant"
    },
    104: {
        id: 104,
        name: "Triceps Extensions & Curls à la Barre",
        emoji: "🔄",
        sets: 3,
        reps: 13,
        image: "images/seance-a-04-triceps.png",
        instructions: "Haltère derrière la tête, coudes fléchis à 90°. Étendez les bras vers le haut.",
        tips: "Coudes restent fixes. Mouvement isolé du triceps.",
        tempo: "1 seconde en extension - 2 secondes en descente",
        targetMuscles: "Triceps",
        difficulty: "Débutant"
    },
    105: {
        id: 105,
        name: "Pectoraux Couché à Deux Haltères",
        emoji: "💪",
        sets: 2,
        reps: 12,
        image: "images/seance-a-05-curls.png",
        instructions: "Allongé, haltères au niveau de la poitrine. Poussez vers le haut avec un mouvement circulaire.",
        tips: "Contrôlez la descente. Ressentez l'étirement des pectoraux.",
        tempo: "2 secondes en descente - 1 seconde en haut - 1 seconde en montée",
        targetMuscles: "Pectoraux",
        difficulty: "Débutant"
    },

    // SEANCE B EXERCISES
    201: {
        id: 201,
        name: "Dumbbell Rows - Tirage Haltères",
        emoji: "🚣",
        sets: 3,
        reps: 12,
        image: "images/seance-b-01-rows.png",
        instructions: "Penché avant, dos plat, haltères au niveau des genoux. Tirez les haltères vers votre poitrine.",
        tips: "Dos plat, cœur engagé. Tirez avec le dos, pas les bras.",
        tempo: "1 seconde en montée - 2 secondes en descente",
        targetMuscles: "Dos, biceps, arrière-épaules",
        difficulty: "Avancé"
    },
    202: {
        id: 202,
        name: "Biceps Curls - Curl Biceps",
        emoji: "💪",
        sets: 3,
        reps: 12,
        image: "images/seance-b-02-biceps-curls.png",
        instructions: "Debout, haltères en main. Pliez les coudes en ramenant les haltères vers les épaules.",
        tips: "Pas de balancement du corps. Isolez le biceps. Palmes vers l'avant.",
        tempo: "1 seconde en montée - 2 secondes en descente",
        targetMuscles: "Biceps, avant-bras",
        difficulty: "Débutant"
    },
    203: {
        id: 203,
        name: "Curl Marteau - Hammer Curls",
        emoji: "🔨",
        sets: 2,
        reps: 12,
        image: "images/seance-b-03-hammer-curls.png",
        instructions: "Debout, haltères avec prise neutre (paumes face à face). Pliez les coudes vers les épaules.",
        tips: "Mouvement plus naturel pour les avant-bras. Évitez l'élan du corps.",
        tempo: "1 seconde en montée - 2 secondes en descente",
        targetMuscles: "Biceps, avant-bras",
        difficulty: "Débutant"
    },
    204: {
        id: 204,
        name: "Arrière Épaules - Rear Delt Flies",
        emoji: "🦅",
        sets: 3,
        reps: 12,
        image: "images/seance-b-04-rear-delt.png",
        instructions: "Penché avant, haltères légers au niveau des hanches. Levez les haltères sur les côtés.",
        tips: "Isolez bien les arrière-épaules. Poids légers avec contrôle.",
        tempo: "2 secondes en montée - 1 seconde en haut - 2 secondes en descente",
        targetMuscles: "Arrière-épaules",
        difficulty: "Débutant"
    },
    205: {
        id: 205,
        name: "Exercice Final - Biceps + Épaules",
        emoji: "⚡",
        sets: 3,
        reps: 12,
        image: "images/seance-b-05-last.png",
        instructions: "Combinaison d'exercices pour finir la séance avec intensité.",
        tips: "Adaptez l'intensité à votre niveau.",
        tempo: "Tempo naturel",
        targetMuscles: "Biceps, épaules",
        difficulty: "Intermédiaire"
    }
};

// Get exercise by ID
function getExerciseById(id) {
    return EXERCISES_DATABASE[id];
}
