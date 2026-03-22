# 📝 Guide de Configuration - Nosarial Plugins

## Structure du Projet

```
NosiaralWebsite/
├── index.html          # Page principale
├── style.css           # Styles (dark mode)
├── script.js           # Logique interactive
├── README.md           # Documentation
├── .gitignore          # Fichiers à ignorer
├── images/             # Dossier pour vos images
│   └── plugin1.jpg
│   └── plugin2.jpg
└── SETUP.md            # Ce fichier
```

## 🚀 Démarrer Rapidement

1. **Ouvrir localement**
   - Double-cliquez sur `index.html`
   - Ou utilisez un serveur local (optionnel)

2. **Ajouter vos images**
   - Mettez les images dans le dossier `images/`
   - Les noms doivent être descriptifs (ex: `inventory-plugin.jpg`)

3. **Mettre à jour les plugins dans `script.js`**

## 🔧 Personnalisation des Plugins

### Format des données

Ouvrez `script.js` et modifiez l'objet `pluginsData` :

```javascript
const pluginsData = {
    inventory: {
        title: "Inventaire Lié",                    // Titre affiché
        description: "Description longue...",       // Texte dans la popup
        commands: [                                  // Liste des commandes
            "/inventory toggle - Explication",
            "/inventory status - Explication"
        ],
        downloadUrl: "https://lien-download"       // Lien du téléchargement
    }
}
```

### Ajouter un nouveau plugin dans `index.html`

```html
<div class="plugin-card" data-plugin="monPlugin">
    <div class="plugin-image">
        <img src="images/mon-plugin.jpg" alt="Mon Plugin">
    </div>
    <div class="plugin-info">
        <h3>Nom du Plugin</h3>
        <p>Description courte (2-3 lignes)</p>
    </div>
</div>
```

⚠️ **Important**: L'attribut `data-plugin` doit correspondre exactement à la clé dans `pluginsData`

## 🎨 Personnaliser les Couleurs

Modifiez les variables CSS dans `style.css` (tout en haut):

```css
:root {
    --primary-color: #6366f1;      /* Couleur principale (bleu) */
    --primary-hover: #4f46e5;      /* Au survol */
    --bg-primary: #0f172a;         /* Fond très sombre */
    --bg-secondary: #1e293b;       /* Fond cartes */
    --text-primary: #f1f5f9;       /* Texte principal */
    --text-secondary: #cbd5e1;     /* Texte secondaire */
}
```

## 📤 Ajouter les Liens de Téléchargement

1. Uploadez vos fichiers `.jar` sur une plateforme:
   - GitHub Releases (recommandé)
   - Mediafire
   - Google Drive
   - Votre serveur

2. Mettez à jour `script.js` avec les URL complètes:

```javascript
downloadUrl: "https://github.com/VOTRE_USERNAME/REPO/releases/download/v1.0/plugin.jar"
```

## 🌐 Déployer sur GitHub Pages

### Première fois:

1. Créez un repository GitHub nommé `NosiaralWebsite`
2. Clonez-le localement
3. Copiez les fichiers du projet dedans
4. Committez et poussez:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```
5. Allez dans **Settings** > **Pages**
6. Sélectionnez "Deploy from a branch" et branche `main`
7. Visitez `https://VOTRE_USERNAME.github.io/NosiaralWebsite`

### Pour mettre à jour:

```bash
# Modifiez les fichiers localement
git add .
git commit -m "Description des changements"
git push
```

Le site sera mis à jour automatiquement en quelques secondes!

## 💡 Conseils

- **Images**: Optimisez vos images (max 500px de large, ~100KB)
- **Commandes**: Listez les plus importantes en premier
- **Description**: Soyez clair et concis
- **Lien download**: Testez toujours que le lien marche!

## ❓ Aide Supplémentaire

Le fichier contient déjà:
- ✅ Dark mode complet
- ✅ Responsive design (mobile-friendly)
- ✅ Animations fluides
- ✅ Persistance des données en JavaScript
- ✅ Popup interactif avec Escape/click outside

Pas besoin de JavaScript/HTML/CSS avancé, modification simple des données suffisent!
