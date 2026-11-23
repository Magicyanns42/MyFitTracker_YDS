# 🚀 Démarrage Rapide - MyFitTracker v1.0.0

## 2️⃣ Minutes pour Commencer!

### **Sur Ordinateur**

#### **Option 1: Super Simple (Recommandée)**
```
1. Allez dans le dossier MyFitTracker_YDS
2. Double-cliquez index.html
3. L'app s'ouvre dans Chrome ✅
```

#### **Option 2: Serveur Local (Plus Fiable)**
```powershell
cd C:\Users\r395762\Downloads\MyFitTracker_YDS
python -m http.server 8000
# Ouvrez: http://localhost:8000
```

### **Sur Mobile (Même WiFi)**

```
1. PC: Lancez le serveur local (Option 2 ci-dessus)
2. Mobile: Chrome → http://ADRESSE_IP_PC:8000
3. Menu (⋯) → Installer l'app
4. Icône ajoutée à votre écran d'accueil ✅
```

---

## ✅ Votre Première Session (3 min)

### **Étape 1: Accueil**
Vous voyez:
- 📅 Semaine en cours
- 🏋️ Sessions complétées
- ⚖️ Poids actuel

### **Étape 2: Sélectionner Programme**
Cliquez **📋 Changer Programme**
→ Choisissez "Upper Body - 8 Semaines"

### **Étape 3: Commencer Session**
Cliquez **▶ Commencer une Session**
→ Vous voyez "Poitrine & Dos"

### **Étape 4: Premier Exercice**
Cliquez **Bench Press**
→ Vous voyez:
- 🎬 Animation du mouvement (SVG animé)
- 📋 Instructions complètes
- 💡 Conseils techniques
- ⏱️ Tempo: 2-0-1

### **Étape 5: Enregistrer une Série**
```
Reps:    8
Poids:   60 kg
RPE:     7/10 (Effort perçu)
```
Cliquez **+ Ajouter**

### **Étape 6: Prochaines Séries**
Répétez pour 3 autres séries
→ Vous voyez l'historique

### **Étape 7: Exercice Suivant**
Cliquez **Exercice Suivant →**
→ Tractions (même processus)

### **Étape 8: Terminer**
Cliquez **✓ Terminer la Session**
→ ✅ Session sauvegardée!

---

## 🎮 Les 10 Exercices Inclus

| # | Exercice | Emoji | Sets | Reps | Niveau |
|---|----------|-------|------|------|--------|
| 1 | Bench Press | 🏋️ | 4 | 8 | Intermédiaire |
| 2 | Tractions | 🤸 | 4 | 6 | Avancé |
| 3 | Flies à la Machine | 🦅 | 3 | 12 | Débutant |
| 4 | Military Press | ⬆️ | 4 | 6 | Intermédiaire |
| 5 | Lateral Raises | 📐 | 3 | 12 | Débutant |
| 6 | Biceps Curls | 💪 | 3 | 10 | Débutant |
| 7 | Triceps Extensions | 🔄 | 3 | 10 | Débutant |
| 8 | Barbell Rows | 🚣 | 4 | 8 | Avancé |
| 9 | Dips | ⬇️ | 3 | 8 | Avancé |
| 10 | Face Pulls | 🎯 | 3 | 15 | Débutant |

---

## 💡 Conseils Rapides

### **Chronomètre**
- ▶ Démarrer
- ⏸ Mettre en pause
- 🔄 Réinitialiser

### **Poids**
- Allez à ⚖️ Enregistrer Poids
- Entrez votre poids du jour
- Historique dans 📊 Statistiques

### **Statistiques**
- Sessions totales
- Temps total d'entraînement
- Poids moyen
- Graphique poids
- Top 5 exercices

### **Paramètres**
- 📥 Exporter données (JSON)
- 🗑️ Effacer toutes données
- Historique sessions

---

## ⚙️ Configuration Avancée

### **Modifier un Exercice**

Ouvrez `js/exercises.js` et cherchez:
```javascript
{
    id: 1,
    name: "Bench Press",
    sets: 4,
    reps: 8,
    instructions: "...",
    tips: "...",
    tempo: "2-0-1",
    targetMuscles: "Poitrine, épaules, triceps",
    difficulty: "Intermédiaire"
}
```

Éditez et rafraîchissez (Ctrl+Shift+R).

### **Changer les Couleurs**

Ouvrez `css/styles.css`:
```css
:root {
    --primary: #6200EE;        /* Violet */
    --secondary: #03DAC6;      /* Teal */
    --success: #4CAF50;        /* Vert */
    --danger: #F44336;         /* Rouge */
}
```

### **Ajouter une Animation SVG**

Ouvrez `js/svg-animations.js` et ajoutez:
```javascript
static getMonExerciceAnimation() {
    return `
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            <!-- Votre SVG ici -->
        </svg>
    `;
}
```

---

## 🌐 Déployer sur GitHub Pages

```bash
# 1. Initialiser git
git init
git add .
git commit -m "Initial: MyFitTracker v1.0.0"

# 2. Ajouter repository GitHub
git remote add origin https://github.com/VOTRE_USERNAME/MyFitTracker_YDS.git
git branch -M main
git push -u origin main

# 3. GitHub.com → Repository → Settings → Pages
# Source: main branch → Save

# 4. Attendez 1-2 minutes
# 5. Ouvrez: https://VOTRE_USERNAME.github.io/MyFitTracker_YDS
```

---

## 🆘 Problèmes Courants

| Problème | Solution |
|----------|----------|
| L'app est blanche/vide | Rafraîchissez (Ctrl+Shift+R) ou changez de navigateur |
| Données perdues | Vérifiez que vous n'êtes pas en navigation privée |
| Pas d'option "Installer" | Utilisez Chrome ou Edge |
| Chronomètre ne marche pas | Vérifiez que JavaScript est activé |
| Connexion WiFi requise | App fonctionne hors ligne après installation |

---

## 📱 Installation PWA (Recommandée)

**Chrome Desktop:**
1. Menu (⋮) → "Installer MyFitTracker"
2. L'app se lance comme une vraie application

**Chrome Android:**
1. Menu (⋯) → "Installer l'app"
2. Icône ajoutée à votre écran d'accueil

**Avantages:**
- ✅ Accès direct
- ✅ Fonctionne hors ligne
- ✅ Chronomètre actif en arrière-plan
- ✅ Pas de navigateur visible

---

## 🎓 Première Semaine du Programme

**Semaine 1: Volume de Base**

**Jour 1: Poitrine & Dos**
1. Bench Press: 4 séries x 8 reps
2. Tractions: 4 séries x 6 reps
3. Flies: 3 séries x 12 reps

**Jour 2: Épaules & Bras**
1. Military Press: 4 séries x 6 reps
2. Lateral Raises: 3 séries x 12 reps
3. Biceps Curls: 3 séries x 10 reps

Répétez 2x par semaine pendant 8 semaines avec progressions! 💪

---

## 🔒 Sécurité des Données

✅ **Toutes vos données sont locales** (jamais envoyées)
✅ **Pas de compte requis**
✅ **Pas de suivi**
✅ **Pas de publicité**
✅ **Export JSON pour sauvegarde**

---

## 🚀 Prêt?

1. **Ouvrez `index.html`**
2. **Choisissez votre programme**
3. **Commencez votre première session**
4. **Progressez semaine après semaine!**

**Bon entraînement! 💪**

---

Pour plus d'infos: Lire le [README complet](README.md)
