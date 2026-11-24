// Programs Data - MyFitTracker v1.1.0
// All 10 professional workout programs: 2 original + 8 new

const PROGRAMS = [
    {
        id: 1,
        name: "🏋️ SÉANCE A - Pectoraux, Épaules, Triceps",
        description: "Première séance du programme Haut du Corps",
        duration: "35-45 minutes",
        image: "images/seance-a-01-bench-press.png",
        cycles: [{
            week: 1,
            days: [{
                name: "Séance A - Pectoraux, Épaules, Triceps",
                exercises: [101, 102, 103, 104, 105]
            }]
        }]
    },
    {
        id: 2,
        name: "🚣 SÉANCE B - Dos, Biceps, Épaules",
        description: "Deuxième séance du programme Haut du Corps",
        duration: "35-45 minutes",
        image: "images/seance-b-01-rows.png",
        cycles: [{
            week: 1,
            days: [{
                name: "Séance B - Dos, Biceps, Épaules",
                exercises: [201, 202, 203, 204, 205]
            }]
        }]
    },
    {
        id: 3,
        name: "💪 Entraînement complet du corps - 20 minutes",
        duration: "20-25 minutes",
        cycles: [{
            week: 1,
            days: [{
                name: "Entraînement complet du corps",
                exercises: [300, 301, 302, 303, 304]
            }]
        }]
    },
    {
        id: 4,
        name: "🏋️ Haut du corps - 25 minutes",
        duration: "20-25 minutes",
        cycles: [{
            week: 1,
            days: [{
                name: "Haut du corps",
                exercises: [310, 311, 312, 313, 314]
            }]
        }]
    },
    {
        id: 5,
        name: "🦵 Bas du corps - 22 minutes",
        duration: "20-25 minutes",
        cycles: [{
            week: 1,
            days: [{
                name: "Bas du corps",
                exercises: [320, 321, 322, 323, 324]
            }]
        }]
    },
    {
        id: 6,
        name: "💪 Bras et épaules toniques - 20 minutes",
        duration: "20-25 minutes",
        cycles: [{
            week: 1,
            days: [{
                name: "Bras et épaules",
                exercises: [330, 331, 332, 333, 334]
            }]
        }]
    },
    {
        id: 7,
        name: "🎯 Core et abdominaux - 18 minutes",
        duration: "20-25 minutes",
        cycles: [{
            week: 1,
            days: [{
                name: "Core et abdominaux",
                exercises: [340, 341, 342, 343, 344]
            }]
        }]
    },
    {
        id: 8,
        name: "🍑 Jambes et fesses bombées - 24 minutes",
        duration: "20-25 minutes",
        cycles: [{
            week: 1,
            days: [{
                name: "Jambes et fesses",
                exercises: [350, 351, 352, 353, 354]
            }]
        }]
    },
    {
        id: 9,
        name: "🔥 Full body cardio-muscu - 25 minutes",
        duration: "20-25 minutes",
        cycles: [{
            week: 1,
            days: [{
                name: "Full body cardio-muscu",
                exercises: [360, 361, 362, 363, 364]
            }]
        }]
    },
    {
        id: 10,
        name: "🎣 Dos et biceps musclés - 23 minutes",
        duration: "20-25 minutes",
        cycles: [{
            week: 1,
            days: [{
                name: "Dos et biceps",
                exercises: [370, 371, 372, 373, 374]
            }]
        }]
    }
];
