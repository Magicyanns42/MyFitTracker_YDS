# MyFitTracker - Suivi de Musculation

Une application web de suivi d'entraînement de musculation fonctionnant directement dans votre navigateur Chrome.

## ✨ Fonctionnalités

✅ **Sélection de Programme**
- Programme Upper Body (8 semaines)
- Programme Full Body (6 semaines)
- Interface intuitive pour changer de programme

✅ **Sessions d'Entraînement Actives**
- Chronomètre intégré (démarrage, pause, réinitialisation)
- Liste des exercices de la journée
- Enregistrement détaillé des séries

✅ **Enregistrement des Séries**
- Nombre de répétitions
- Poids utilisé (kg)
- RPE (Rate of Perceived Exertion) 1-10
- Historique des séries par exercice
- Suppression de séries erronées

✅ **Suivi du Poids**
- Enregistrement quotidien du poids
- Historique complet avec dates
- Vue sur l'écran d'accueil

✅ **Statistiques Complètes**
- Nombre de sessions
- Temps total d'entraînement
- Poids moyen
- Graphique du poids au fil du temps
- Exercices les plus pratiqués

✅ **Paramètres & Données**
- Exporter vos données en JSON
- Effacer toutes les données (avec confirmation)
- Historique complet des sessions
- À propos de l'application

## 🚀 Utilisation

### Installation

1. **Télécharger les fichiers**
   - Clonez le repository ou téléchargez les fichiers
   
2. **Lancer l'application**
   - Ouvrez `index.html` dans Chrome
   - Ou utilisez un serveur local: `python -m http.server 8000`
   - Accédez à `http://localhost:8000`

3. **Installer comme PWA (Optionnel)**
   - Chrome affichera une notification d'installation
   - Cliquez "Installer" pour ajouter à votre écran d'accueil
   - Fonctionne hors ligne après installation

### Premier Démarrage

1. **Accueil** → Affiche les stats actuelles
2. **Sélectionner un Programme** → Choisissez votre programme
3. **Commencer une Session** → Lancez votre entraînement
4. **Enregistrer les Séries** → Pour chaque exercice:
   - Cliquez sur l'exercice
   - Entrez vos reps, poids, RPE
   - Cliquez "+ Ajouter Série"
   - Passez à l'exercice suivant
5. **Terminer** → Cliquez "Terminer la Session"

## 📱 Compatibilité

- ✅ Chrome (Android & Desktop)
- ✅ Edge
- ✅ Safari 15+
- ✅ Firefox
- ✅ Fonctionne hors ligne après installation

## 💾 Stockage des Données

Toutes les données sont sauvegardées **localement** sur votre appareil/navigateur:
- Pas de compte requis
- Pas de synchronisation cloud
- Vos données vous appartiennent entièrement
- Stockage illimité (généralement 50MB+)

Vous pouvez **exporter** vos données en JSON depuis les Paramètres.

## 🔧 Développement

### Structure des Fichiers

```
MyFitTracker_YDS/
├── index.html          # Structure HTML principale
├── css/
│   └── styles.css      # Styles Material Design 3
├── js/
│   ├── data.js         # Gestion de la base de données (LocalStorage)
│   ├── ui.js           # Interface utilisateur (Compose)
│   └── app.js          # Initialisation de l'app
├── manifest.json       # Configuration PWA
├── sw.js               # Service Worker (offline)
└── README.md          # Ce fichier
```

### Programmes (data.js)

Les programmes sont définis dans `Database.getDefaultPrograms()`:

```javascript
{
  id: 1,
  name: "Upper Body - 8 Semaines",
  duration: 8,
  cycles: [
    {
      week: 1,
      days: [
        {
          day: 1,
          name: "Poitrine & Dos",
          exercises: [...]
        }
      ]
    }
  ]
}
```

### Ajouter un Exercice

Dans `data.js`, ajoutez un exercice au tableau `exercises`:

```javascript
{
  id: 11,
  name: "Deadlift",
  sets: 4,
  reps: 5,
  instructions: "Pieds largeur épaules...",
  tips: "Gardez le dos droit...",
  tempo: "2-0-1"
}
```

### Modifier un Programme

Éditez la section `getDefaultPrograms()` dans `data.js` ou modifiez via l'app puis exportez.

## 📊 Statistiques

L'app suivi automatiquement:
- **Sessions**: Nombre d'entraînements
- **Durée**: Temps total d'entraînement
- **Poids**: Évolution de votre poids
- **Exercices**: Lesquels vous pratiquez le plus

## 🐛 Problèmes Courants

### L'app ne se charge pas
- Utilisez un serveur local au lieu d'ouvrir le fichier directement
- Vérifiez que JavaScript est activé

### Les données ne sont pas sauvegardées
- Vérifiez que vous n'êtes pas en navigation privée/incognito
- Libérez de l'espace de stockage

### Le Service Worker ne fonctionne pas
- Utilisez HTTPS ou localhost
- Vérifiez la console du navigateur

## 🔐 Sécurité & Confidentialité

✅ **Aucun suivi**
✅ **Pas de publicité**
✅ **Pas de connexion requise**
✅ **Données locales uniquement**
✅ **Code open-source**

## 🚀 Prochaines Versions

**v1.1:**
- Images animées des exercices
- Plus de programmes (Jambes, Full Body, etc.)
- Graphiques plus détaillés

**v1.2:**
- Synchronisation cloud optionnelle
- Notifications d'entraînement
- Export PDF

**v2.0:**
- Application Android native
- Synchronisation multi-appareils
- Communauté d'utilisateurs

## 📧 Support

Avez-vous des questions ou besoin d'aide?
- Vérifiez la console du navigateur (F12)
- Exportez vos données régulièrement
- Signalez les bugs sur GitHub

## 📄 Licence

MIT - Libre d'utilisation

---

**MyFitTracker v1.0.0** - Construite avec ❤️ pour les passionnés de musculation
