# Nosarial Plugins

Un site web moderne et épuré pour présenter les plugins Minecraft créés pour les vidéos de Nosarial.

## Caractéristiques

✨ **Design Moderne** - Interface épurée avec dark mode  
📱 **Responsive** - Fonctionne sur desktop et mobile  
⚡ **Rapide** - HTML/CSS/JavaScript pur, zéro dépendances  
🚀 **GitHub Pages** - Hébergement gratuit

## Plugins

### 1. Inventaire Lié
Synchronise l'inventaire et la vie entre tous les joueurs du serveur.

### 2. Accélérateur de Temps
Contrôlez la vitesse du temps dans votre monde Minecraft.

## Installation Locale

1. Clonez le repository
```bash
git clone https://github.com/YOUR_USERNAME/NosiaralWebsite.git
```

2. Ouvrez `index.html` dans votre navigateur

## Déploiement sur GitHub Pages

1. Accédez aux paramètres de votre repository
2. Allez dans "Pages"
3. Sélectionnez "Deploy from a branch"
4. Choisissez la branche `main` et le dossier `/ (root)`
5. Votre site sera accessible à `https://YOUR_USERNAME.github.io/NosiaralWebsite`

## Comment Ajouter un Nouveau Plugin

1. Ouvrez `script.js`
2. Ajoutez votre plugin dans l'objet `pluginsData`:

```javascript
pluginName: {
    title: "Nom du Plugin",
    description: "Description complète...",
    commands: [
        "/command1 - Description",
        "/command2 - Description"
    ],
    downloadUrl: "https://lien-vers-telecharger"
}
```

3. Ouvrez `index.html` et ajoutez une nouvelle carte:

```html
<div class="plugin-card" data-plugin="pluginName">
    <div class="plugin-image">
        <img src="image-url" alt="Nom du Plugin">
    </div>
    <div class="plugin-info">
        <h3>Nom du Plugin</h3>
        <p>Description courte</p>
    </div>
</div>
```

## Images des Plugins

Pour remplacer les images placeholder:
1. Uploadez vos images dans un dossier `images/`
2. Mettez à jour les `src` dans les balises `<img>`

## Technologies

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript Vanilla

## Licence

Tous droits réservés - Nosarial

## Support

Pour toute question ou suggestion, contactez le développeur.
