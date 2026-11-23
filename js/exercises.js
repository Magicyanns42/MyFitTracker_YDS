// Detailed Exercises Database with Animations
const EXERCISES_DATABASE = {
    1: {
        id: 1,
        name: "Bench Press",
        emoji: "🏋️",
        sets: 4,
        reps: 8,
        instructions: "Allongé sur le banc, haltères au niveau de la poitrine. Poussez les haltères vers le haut jusqu'à extension complète, puis redescendez lentement.",
        tips: "Inspirez en descendant, expirez en poussant. Gardez les coudes à 45° du corps. Évitez de faire un pont excessif.",
        tempo: "2 secondes en descente - 0 secondes en bas - 1 seconde en montée",
        targetMuscles: "Poitrine, épaules, triceps",
        difficulty: "Intermédiaire"
    },
    2: {
        id: 2,
        name: "Tractions",
        emoji: "🤸",
        sets: 4,
        reps: 6,
        instructions: "Prise en pronation (paumes vers l'avant), largeur des épaules. Tirez-vous vers le haut jusqu'à ce que votre menton dépasse la barre.",
        tips: "Engagez les omoplates. Descendez lentement. Si trop difficile, utilisez une bande élastique ou une machine.",
        tempo: "1 seconde en montée - 1 seconde en haut - 2 secondes en descente",
        targetMuscles: "Dos, biceps, avant-bras",
        difficulty: "Avancé"
    },
    3: {
        id: 3,
        name: "Flies à la Machine",
        emoji: "🦅",
        sets: 3,
        reps: 12,
        instructions: "Assis sur la machine, haltères au niveau des épaules. Poussez les haltères ensemble vers l'avant jusqu'à une légère extension.",
        tips: "Mouvement contrôlé, amplitude complète. Sentez la contraction de la poitrine.",
        tempo: "2 secondes en avant - 1 seconde de contraction - 2 secondes en retour",
        targetMuscles: "Poitrine",
        difficulty: "Débutant"
    },
    4: {
        id: 4,
        name: "Military Press",
        emoji: "⬆️",
        sets: 4,
        reps: 6,
        instructions: "Haltères au niveau des épaules, coudes à 90°. Poussez vers le haut jusqu'à extension complète en engageant les épaules.",
        tips: "Pas d'arquer excessivement le dos. Core bien engagé. Respiration: inspirez en bas, expirez en poussant.",
        tempo: "2 secondes en descente - 0 secondes en bas - 1 seconde en montée",
        targetMuscles: "Épaules, triceps, haut poitrine",
        difficulty: "Intermédiaire"
    },
    5: {
        id: 5,
        name: "Lateral Raises",
        emoji: "📐",
        sets: 3,
        reps: 12,
        instructions: "Debout, légers haltères au niveau des hanches, petite flexion aux coudes. Levez les haltères sur les côtés jusqu'à la hauteur des épaules.",
        tips: "Évitez les haltères trop lourds. Sentez la contraction en haut. Poids contrôlé à la descente.",
        tempo: "2 secondes en montée - 1 seconde en haut - 2 secondes en descente",
        targetMuscles: "Épaules (deltoïde latéral)",
        difficulty: "Débutant"
    },
    6: {
        id: 6,
        name: "Biceps Curls",
        emoji: "💪",
        sets: 3,
        reps: 10,
        instructions: "Debout, haltères en main, dos au mur ou légèrement contre. Pliez les coudes en ramenant les haltères vers les épaules.",
        tips: "Pas de balancement du corps. Isolez le biceps. Palmes vers l'avant.",
        tempo: "1 seconde en montée - 1 seconde de contraction - 2 secondes en descente",
        targetMuscles: "Biceps, avant-bras",
        difficulty: "Débutant"
    },
    7: {
        id: 7,
        name: "Triceps Extensions",
        emoji: "🔄",
        sets: 3,
        reps: 10,
        instructions: "Haltère derrière la tête, coudes fléchis à 90°. Étendez les bras vers le haut, puis redescendez lentement.",
        tips: "Coudes restent fixes. Mouvement isolé du triceps. Poids contrôlé.",
        tempo: "1 seconde en extension - 1 seconde en haut - 2 secondes en descente",
        targetMuscles: "Triceps",
        difficulty: "Débutant"
    },
    8: {
        id: 8,
        name: "Barbell Rows",
        emoji: "🚣",
        sets: 4,
        reps: 8,
        instructions: "Penché avant, dos plat, barre au niveau des genoux. Tirez la barre vers votre poitrine en engageant les omoplates.",
        tips: "Dos plat, cœur engagé. Tirez avec le dos, pas les bras. Les coudes passent près du corps.",
        tempo: "1 seconde en montée - 1 seconde en haut - 2 secondes en descente",
        targetMuscles: "Dos, biceps, arrière-épaules",
        difficulty: "Avancé"
    },
    9: {
        id: 9,
        name: "Dips",
        emoji: "⬇️",
        sets: 3,
        reps: 8,
        instructions: "Entre deux barres parallèles, bras tendus. Pliez les coudes et descendez le corps, puis remontez.",
        tips: "Penchez légèrement en avant pour plus de poitrine. Si difficile, utilisez une machine ou une bande élastique.",
        tempo: "2 secondes en descente - 0 secondes en bas - 1 seconde en montée",
        targetMuscles: "Poitrine, triceps, épaules",
        difficulty: "Avancé"
    },
    10: {
        id: 10,
        name: "Face Pulls",
        emoji: "🎯",
        sets: 3,
        reps: 15,
        instructions: "Avec une corde sur la poulie haute, face à la machine. Tirez la corde vers votre visage en écartant les extrémités.",
        tips: "Excellent pour la santé d'épaule. Contraction maximale en haut. RPE modéré.",
        tempo: "1 seconde en montée - 1 seconde de contraction - 2 secondes en descente",
        targetMuscles: "Arrière-épaules, rhomboïdes",
        difficulty: "Débutant"
    }
};

// Program Structure
const PROGRAMS = [
    {
        id: 1,
        name: "Upper Body - 8 Semaines",
        description: "Programme complet haut du corps avec progressions",
        duration: 8,
        targetLevel: "Intermédiaire",
        cycles: [
            {
                week: 1,
                theme: "Volume de Base",
                days: [
                    {
                        day: 1,
                        name: "Poitrine & Dos",
                        focus: "Poitrine & Dos",
                        exercises: [1, 2, 3]
                    },
                    {
                        day: 2,
                        name: "Épaules & Bras",
                        focus: "Épaules & Bras",
                        exercises: [4, 5, 6]
                    }
                ]
            },
            {
                week: 2,
                theme: "Augmentation Volume",
                days: [
                    {
                        day: 1,
                        name: "Poitrine & Dos",
                        focus: "Poitrine & Dos",
                        exercises: [1, 2, 3]
                    },
                    {
                        day: 2,
                        name: "Épaules & Bras",
                        focus: "Épaules & Bras",
                        exercises: [4, 5, 6, 7]
                    }
                ]
            },
            {
                week: 3,
                theme: "Force & Hypertrophie",
                days: [
                    {
                        day: 1,
                        name: "Poitrine & Dos",
                        focus: "Poitrine & Dos",
                        exercises: [1, 2, 8, 3]
                    },
                    {
                        day: 2,
                        name: "Épaules & Bras",
                        focus: "Épaules & Bras",
                        exercises: [4, 5, 6, 7]
                    }
                ]
            },
            {
                week: 4,
                theme: "Décharge",
                days: [
                    {
                        day: 1,
                        name: "Poitrine & Dos (Léger)",
                        focus: "Poitrine & Dos",
                        exercises: [1, 2, 3]
                    },
                    {
                        day: 2,
                        name: "Épaules & Bras (Léger)",
                        focus: "Épaules & Bras",
                        exercises: [4, 5, 6]
                    }
                ]
            },
            {
                week: 5,
                theme: "Intensité Augmentée",
                days: [
                    {
                        day: 1,
                        name: "Poitrine & Dos",
                        focus: "Poitrine & Dos",
                        exercises: [1, 2, 8, 3, 9]
                    },
                    {
                        day: 2,
                        name: "Épaules & Bras",
                        focus: "Épaules & Bras",
                        exercises: [4, 5, 6, 7, 10]
                    }
                ]
            },
            {
                week: 6,
                theme: "Volume Maximal",
                days: [
                    {
                        day: 1,
                        name: "Poitrine & Dos",
                        focus: "Poitrine & Dos",
                        exercises: [1, 2, 8, 3, 9]
                    },
                    {
                        day: 2,
                        name: "Épaules & Bras",
                        focus: "Épaules & Bras",
                        exercises: [4, 5, 6, 7, 10]
                    }
                ]
            },
            {
                week: 7,
                theme: "Force & Puissance",
                days: [
                    {
                        day: 1,
                        name: "Poitrine & Dos",
                        focus: "Poitrine & Dos",
                        exercises: [1, 2, 8, 3]
                    },
                    {
                        day: 2,
                        name: "Épaules & Bras",
                        focus: "Épaules & Bras",
                        exercises: [4, 5, 6, 7]
                    }
                ]
            },
            {
                week: 8,
                theme: "Finale & Test",
                days: [
                    {
                        day: 1,
                        name: "Poitrine & Dos (Test)",
                        focus: "Poitrine & Dos",
                        exercises: [1, 2, 8]
                    },
                    {
                        day: 2,
                        name: "Épaules & Bras (Test)",
                        focus: "Épaules & Bras",
                        exercises: [4, 5, 6, 7]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Full Body - 6 Semaines",
        description: "Programme complet corps entier avec alternances",
        duration: 6,
        targetLevel: "Intermédiaire",
        cycles: [
            {
                week: 1,
                theme: "Adaptation",
                days: [
                    {
                        day: 1,
                        name: "Full Body A",
                        focus: "Corps Entier",
                        exercises: [1, 2, 4]
                    },
                    {
                        day: 2,
                        name: "Full Body B",
                        focus: "Corps Entier",
                        exercises: [3, 6, 8]
                    }
                ]
            },
            {
                week: 2,
                theme: "Volume Croissant",
                days: [
                    {
                        day: 1,
                        name: "Full Body A",
                        focus: "Corps Entier",
                        exercises: [1, 2, 4, 5]
                    },
                    {
                        day: 2,
                        name: "Full Body B",
                        focus: "Corps Entier",
                        exercises: [3, 6, 8, 7]
                    }
                ]
            }
        ]
    }
];

// Material Database
const MATERIALS = {
    dumbbells: {
        name: "Haltères",
        emoji: "🏋️",
        weights: [5, 10, 15, 20, 25, 30, 40, 50]
    },
    barbell: {
        name: "Barre",
        emoji: "➖",
        weights: [20, 40, 60, 80, 100, 120]
    },
    bands: {
        name: "Élastiques",
        emoji: "🔗",
        resistance: ["Léger", "Moyen", "Lourd", "Très Lourd"]
    },
    machine: {
        name: "Machine",
        emoji: "⚙️",
        types: ["Poitrine", "Dos", "Épaules", "Bras"]
    }
};
