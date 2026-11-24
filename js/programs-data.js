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
                exercises: [100, 101, 102, 103, 104, 105]
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
                exercises: [106, 107, 108, 109, 110, 111]
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
                exercises: [112, 113, 114, 115, 116]
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
                exercises: [117, 118, 119, 120, 121, 122]
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
                exercises: [123, 124, 125, 126, 127]
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
                exercises: [128, 129, 130, 131, 132]
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
                exercises: [133, 134, 135, 136, 137]
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
                exercises: [138, 139, 140, 141, 142]
            }]
        }]
    }
];
