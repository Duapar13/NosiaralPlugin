# Configuration Avancée - Nosarial Plugins

## 🎯 Cas d'Usage Courants

### Changer le titre du site

**index.html** - Ligne 6:
```html
<title>Nosarial Plugins - Plugins Minecraft</title>
```

**index.html** - Dans le header:
```html
<h1 class="header-title">Nosarial Plugins</h1>
<p class="header-subtitle">Plugins Minecraft pour les vidéos de Nosarial</p>
```

### Ajouter un bouton Discord / YouTUBE

Dans **index.html**, après les plugins:

```html
<section class="social-section">
    <a href="https://discord.gg/VOTRE_CODE" class="social-btn discord">Discord</a>
    <a href="https://youtube.com/@VOTRE_CHAINE" class="social-btn youtube">YouTube</a>
</section>
```

Puis dans **style.css**:

```css
.social-section {
    text-align: center;
    margin: 40px 0;
}

.social-btn {
    display: inline-block;
    padding: 12px 30px;
    margin: 0 10px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.social-btn.discord {
    background-color: #5865f2;
    color: white;
}

.social-btn.youtube {
    background-color: #ff0000;
    color: white;
}

.social-btn:hover {
    transform: scale(1.05);
    opacity: 0.8;
}
```

### Afficher les numéros de téléchargement (optionnel)

Modifiez `script.js`:

```javascript
pluginName: {
    title: "Nom",
    description: "...",
    commands: [...],
    downloadUrl: "...",
    downloads: 1234                    // Ajouter ceci
}
```

Puis dans **index.html**, dans la modal:

```html
<div class="modal-stats">
    <span>📥 <span id="modalDownloads">0</span> téléchargements</span>
</div>
```

Et dans **script.js**, dans la fonction `openModal`:

```javascript
document.getElementById("modalDownloads").textContent = plugin.downloads || 0;
```

### Ajouter une section "À propos"

Dans **index.html**, après la grille des plugins:

```html
<section class="about-section">
    <h2>À propos</h2>
    <p>Bienvenue sur le site officiel des plugins Minecraft pour les vidéos de Nosarial. 
    Tous les plugins sont testés et optimisés pour garantir la meilleure expérience.</p>
</section>
```

Dans **style.css**:

```css
.about-section {
    text-align: center;
    max-width: 600px;
    margin: 60px auto;
    padding: 40px;
    background-color: var(--bg-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.about-section h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
}

.about-section p {
    color: var(--text-secondary);
    line-height: 1.8;
}
```

### Changer la couleur du thème

Dans **style.css**, modifiez la première couleur:

```css
--primary-color: #6366f1;  /* Changez ce code couleur */
```

Suggestions de couleurs:
- Bleu: `#6366f1` (défaut)
- Orange: `#f97316`
- Rose: `#ec4899`
- Vert: `#10b981`
- Violet: `#8b5cf6`

## 🔍 Dépannage

**Q: La modal ne s'ouvre pas?**
- Vérifiez que `data-plugin="X"` dans HTML correspond à la clé dans `pluginsData` dans JS

**Q: Les images ne s'affichent pas?**
- Vérifiez les chemins (utilisez des chemins relatifs: `images/nom.jpg`)
- Assurez-vous que l'image existe dans le dossier `images/`

**Q: Le site n'est pas responsive sur mobile?**
- Assurez-vous que la balise `<meta name="viewport">` est dans le `<head>`
- Test: Ouvrez avec F12 et togglez le device toolbar

## 📦 Fichiers Importants à Ne Pas Modifier (Sauf Si Vous Savez!)

- `script.js` - Logique JS
- `style.css` - Tous les styles
- `index.html` - Structure HTML

Les modifications doivent se faire **à l'intérieur** de ces fichiers, pas les remplacer entièrement.

## 🎓 Ressources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
