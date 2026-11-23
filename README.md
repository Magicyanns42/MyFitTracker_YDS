# MyFitTracker - Version Complète Web PWA

**Application Complète de Suivi de Musculation** 💪

Une application web progressive (PWA) complète pour suivre votre entraînement de musculation avec un programme 8 semaines, chronomètre intégré, enregistrement de séries, et suivi des statistiques.

---

## ✨ Fonctionnalités Complètes

### 🎯 **Programme d'Entraînement 8 Semaines**
- ✅ Upper Body complet (Haut du Corps)
- ✅ 10 exercices détaillés avec instructions
- ✅ Progressions semaine par semaine
- ✅ Thème de chaque semaine (volume, force, décharge, etc.)

### 🏋️ **Exercices avec Animations SVG**
1. **Bench Press** - Poitrine, épaules, triceps
2. **Tractions** - Dos, biceps, avant-bras
3. **Flies à la Machine** - Poitrine
4. **Military Press** - Épaules, triceps
5. **Lateral Raises** - Deltoïdes latéraux
6. **Biceps Curls** - Biceps, avant-bras
7. **Triceps Extensions** - Triceps
8. **Barbell Rows** - Dos, biceps, arrière
9. **Dips** - Poitrine, triceps, épaules
10. **Face Pulls** - Arrière-épaules, santé

Chaque exercice inclut:
- 🎬 Animation SVG du mouvement
- 📋 Instructions détaillées
- 💡 Conseils de technique
- ⏱️ Tempo recommandé
- 🎯 Muscles ciblés
- 📊 Niveau de difficulté

### 💪 **Sessions d'Entraînement**
- ✅ Chronomètre intégré (démarrer/pause/réinitialiser)
- ✅ Liste des exercices du jour
- ✅ Navigation entre exercices
- ✅ Enregistrement détaillé par série

### 📝 **Enregistrement des Séries**
Pour chaque série:
- **Nombre de Reps** (répétitions)
- **Poids utilisé** (en kg)
- **RPE** (Rate of Perceived Exertion) 1-10
- Historique complet par exercice
- Suppression de séries erronées

### ⚖️ **Suivi du Poids**
- Enregistrement quotidien du poids
- Historique complet avec dates
- Affichage sur l'accueil
- Poids moyen calculé

### 📊 **Statistiques Avancées**
- Nombre total de sessions
- Temps d'entraînement total
- Poids moyen
- Graphique du poids au fil du temps
- Top 5 exercices pratiqués
- Vue détaillée des sessions récentes

### 💾 **Gestion des Données**
- Sauvegarde **locale** automatique (LocalStorage)
- **Export JSON** pour sauvegarde externe
- Effacement complet avec confirmation
- Historique de 10 dernières sessions
- Pas de compte requis

### 📱 **Progressive Web App**
- ✅ Fonctionne hors ligne après installation
- ✅ Installation comme app mobile
- ✅ Accès depuis l'écran d'accueil
- ✅ Interface épurée et responsif
- ✅ Chronomètre actif en arrière-plan

---

## 🚀 Lancement Rapide

### **Sur Ordinateur**
```bash
# Option 1: Double-cliquez index.html
# Option 2: Serveur local
python -m http.server 8000
# Puis ouvrez: http://localhost:8000
```

### **Sur Mobile**
1. **Depuis le même WiFi que le PC:**
   ```
   http://ADRESSE_IP_PC:8000
   ```

2. **Depuis GitHub Pages:**
   ```
   https://username.github.io/MyFitTracker_YDS
   ```

3. **Installer comme App:**
   - Ouvrez dans Chrome
   - Menu (⋯) → "Installer l'app"
   - L'app s'ajoute à votre écran d'accueil

---

## 📂 Structure du Projet

```
MyFitTracker_YDS/
├── index.html              ← Main HTML
├── css/
│   └── styles.css         ← Material Design 3 complet
├── js/
│   ├── exercises.js       ← Base de données exercices
│   ├── svg-animations.js  ← Animations SVG des mouvements
│   ├── data.js            ← Gestion LocalStorage
│   ├── ui.js              ← Interface utilisateur
│   └── app.js             ← Initialisation PWA
├── manifest.json          ← Config PWA
├── sw.js                  ← Service Worker offline
└── README.md              ← Documentation
```

---

## 🎮 Utilisation

### **Première Session**

1. **Accueil** → Vos stats actuelles
2. **📋 Changer Programme** → Upper Body 8 semaines
3. **▶ Commencer Session** → Poitrine & Dos
4. **Pour chaque exercice:**
   - Cliquez sur l'exercice
   - Regardez l'animation SVG du mouvement
   - Lisez instructions & conseils
   - Enregistrez vos séries:
     - Reps (ex: 8)
     - Poids (ex: 60 kg)
     - RPE (ex: 7/10)
   - Passez à l'exercice suivant
5. **✓ Terminer Session** → Données sauvegardées

### **Suivi du Poids**
- Accueil → ⚖️ Enregistrer Poids
- Entrez votre poids du jour
- Historique et graphique dans Statistiques

### **Statistiques**
- Accueil → 📊 Statistiques
- Graphique poids
- Top 5 exercices
- Temps total

### **Paramètres**
- Accueil → ⚙️ Paramètres
- Exporter données (JSON)
- Historique sessions (10 dernières)
- À propos & infos

---

## 📊 Contenu Complet des Exercices

### **Bench Press 🏋️**
- Sets: 4 | Reps: 8
- Poitrine principale, épaules, triceps secondaires
- Tempo: 2-0-1 (descente lente, montée rapide)
- Animation: Haltères en poitrine, extension complète

### **Tractions 🤸**
- Sets: 4 | Reps: 6 (avancé)
- Dos complet, biceps, avant-bras
- Prise en pronation, largeur épaules
- Animation: Tirage vers le haut, contrôle en descente

### **Lateral Raises 📐**
- Sets: 3 | Reps: 12
- Isolement des deltoïdes latéraux
- Haltères légers, petite flexion coude
- Animation: Levée latérale synchronisée

### **Military Press ⬆️**
- Sets: 4 | Reps: 6
- Épaules explosives, triceps, haut poitrine
- Position debout, core engagé
- Animation: Poussée verticale en contrôle

### **Biceps Curls 💪**
- Sets: 3 | Reps: 10
- Isolement biceps, avant-bras
- Pas de balancement, dos au mur
- Animation: Flexion dos contre surface

Et 5 autres exercices complets...

---

## 🔒 Sécurité & Confidentialité

✅ **Données 100% Locales** (jamais envoyées)
✅ **Pas de Tracking**
✅ **Pas de Publicité**
✅ **Pas de Compte Requis**
✅ **Code Open Source**
✅ **Hors Ligne Après Installation**

---

## 🌐 Compatibilité

- ✅ Chrome (Android & Desktop)
- ✅ Edge
- ✅ Firefox
- ✅ Safari 15+
- ✅ Responsive (mobile, tablet, desktop)

---

## 🛠️ Développement

### Modifier les Exercices
Éditez `js/exercises.js` - section `EXERCISES_DATABASE`

### Ajouter une Programme
Éditez `js/exercises.js` - section `PROGRAMS`

### Changer les Couleurs
Éditez `css/styles.css` - variables CSS (`:root`)

### Ajouter des Animations
Éditez `js/svg-animations.js` - Ajoutez des SVG

---

## 📤 Déploiement GitHub Pages

```bash
git init
git add .
git commit -m "Initial: MyFitTracker Web v1.0.0"
git remote add origin https://github.com/USERNAME/MyFitTracker_YDS.git
git branch -M main
git push -u origin main

# Settings → Pages → Source: main
# Attendez 1-2 min
# URL: https://USERNAME.github.io/MyFitTracker_YDS
```

---

## 🎯 Roadmap

**v1.0.0** (Actuel) ✅
- Programme 8 semaines complet
- 10 exercices avec animations
- Chronomètre et enregistrement
- Statistiques & suivi poids
- PWA offline

**v1.1** (Prochaine)
- Programmes supplémentaires (Jambes, Full Body)
- Graphiques avancés
- Partage de statistiques
- Thèmes personnalisés

**v1.2**
- Firebase sync optionnel
- Notifications d'entraînement
- Export PDF
- Communauté

**v2.0**
- Application Android native
- Synchronisation multi-appareils
- Suivi nutition
- Plans d'alimentation

---

## 📝 Notes Importantes

- Données sauvegardées dans LocalStorage (navigateur)
- Maximum ~50MB sur plupart des navigateurs
- Videz le cache de votre navigateur si erreurs
- Exporter vos données régulièrement (Paramètres)
- Compatible tous navigateurs modernes

---

## 🤝 Support

Besoin d'aide?
- 🔧 Consultez le code (bien commenté)
- 📖 Lisez les instructions dans l'app
- 💾 Exportez/importez vos données
- 🔄 Rafraîchissez la page (Ctrl+Shift+R)

---

## 📄 Licence

MIT - Libre d'utilisation

---

**MyFitTracker v1.0.0** 💪
Construite avec ❤️ pour les passionnés de musculation

Prêt? Ouvrez `index.html` et commencez votre entraînement! 🚀
