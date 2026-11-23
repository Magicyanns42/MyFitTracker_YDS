# 🚀 Démarrage Rapide MyFitTracker - 2 Minutes

## Étape 1: Lancer l'Application

### Option A: Ouvrir directement (Simple)
1. Double-cliquez `index.html`
2. L'app s'ouvre dans votre navigateur par défaut

### Option B: Serveur local (Recommandé)

**Avec Python:**
```bash
cd MyFitTracker_YDS
python -m http.server 8000
# Ouvrez http://localhost:8000
```

**Avec Node.js:**
```bash
cd MyFitTracker_YDS
npx http-server
```

## Étape 2: Première Utilisation

### 1️⃣ Accueil
Vous voyez 3 stats:
- 📊 Semaine en cours
- 💪 Sessions complétées
- ⚖️ Poids actuel

### 2️⃣ Sélectionner un Programme
Cliquez **"📋 Changer de Programme"**
- Choisissez "Upper Body - 8 Semaines"

### 3️⃣ Commencer une Session
Cliquez **"▶ Commencer une Session"**
- Vous voyez la liste des exercices
- Chronomètre prêt

### 4️⃣ Enregistrer une Série
Pour chaque exercice:
1. Cliquez sur l'exercice
2. Remplissez:
   - **Reps**: Nombre de répétitions (ex: 8)
   - **Poids (kg)**: Poids utilisé (ex: 60)
   - **RPE (1-10)**: Effort perçu (1=très facile, 10=max)
3. Cliquez **"+ Ajouter Série"**
4. Répétez pour chaque série

### 5️⃣ Passer à l'Exercice Suivant
Cliquez **"Exercice Suivant →"**

### 6️⃣ Terminer la Session
Cliquez **"✓ Terminer la Session"**
- Toutes vos données sont sauvegardées
- Vous revenez à l'accueil

## 📱 Installer comme App (PWA)

**Sur Chrome Desktop:**
1. En haut à droite, cliquez le menu (⋮)
2. `Installer MyFitTracker`

**Sur Chrome Android:**
1. Menu (⋯) → Installer l'app
2. L'app s'ajoute à votre écran d'accueil

## 💡 Conseils

✅ **Suivi du Poids**
- Allez à l'accueil → ⚖️ Enregistrer Poids
- Entrez votre poids du jour

✅ **Voir les Stats**
- Accueil → 📊 Statistiques
- Graphique du poids + exercices top

✅ **Paramètres**
- Accueil → ⚙️ Paramètres
- Exporter vos données en JSON
- Voir l'historique des sessions

## 🎯 Utilisation Avancée

### Exporter Vos Données
1. Allez à ⚙️ Paramètres
2. Cliquez **"📥 Exporter Données"**
3. Un fichier JSON se télécharge
4. Sauvegardez-le en sécurité

### Modifier les Programmes
- Les programmes sont dans `js/data.js`
- Modifiez les exercices/séries
- Rafraîchissez la page (Ctrl+Shift+R)

### Utiliser Hors Ligne
- Installez comme PWA
- L'app fonctionne sans internet
- Vos données se synchronisent au retour en ligne

## 🆘 Dépannage

| Problème | Solution |
|----------|----------|
| L'app ne se charge pas | Utilisez un serveur local au lieu d'ouvrir le fichier |
| Données perdues | Vérifiez que vous n'êtes pas en navigation privée |
| Pas d'option "Installer" | Utilisez Chrome (recommandé) |
| Chronomètre ne fonctionne pas | Vérifiez que JavaScript est activé |

## 📚 Ressources

- 📖 Lire le [README complet](README.md)
- 🔧 Voir la [structure du projet](../README.md#-développement)
- 💾 [Exporter vos données](README.md#-stockage-des-données)

---

**Prêt?** Ouvrez `index.html` et commencez votre entraînement! 💪
