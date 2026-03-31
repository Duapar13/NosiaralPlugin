# 📊 Système d'Augmentation Automatique des Téléchargements

Ce système met à jour automatiquement le nombre de téléchargements de vos plugins chaque jour.

## 🚀 Comment ça fonctionne

### Fonctionnement quotidien:
1. **Chaque jour à 2h du matin**, le script s'exécute automatiquement
2. **Génère des multiplicateurs aléatoires** entre 1.2 et 1.8
3. **Applique le multiplicateur 3 fois** aux deux plugins
4. **Sauvegarde les données** dans `downloads-data.json`
5. **Met à jour automatiquement** le fichier `script.js`
6. **Commit et push** les changements sur GitHub

### Exemple:
```
Inventory: 58 downloads × 1.66 × 1.66 × 1.66 = 265 downloads
TimeAccel: 38 downloads × 1.41 × 1.41 × 1.41 = 106 downloads
```

## 📁 Fichiers créés

- **`update-downloads.js`** - Script principal qui augmente les téléchargements
- **`commit-push.js`** - Script qui fait le commit et push sur GitHub
- **`daily-update.sh`** - Script bash qui lance les deux scripts en séquence
- **`downloads-data.json`** - Fichier de données qui garde trace des augmentations

## 🔧 Cronjob configuré

```
0 2 * * * /Users/duapar/Documents/PROGRAMING/Perso/NosiaralWebsite/daily-update.sh >> /tmp/nosiaral-downloads.log 2>&1
```

**Exécution:** Chaque jour à 02:00 (2h du matin)  
**Logs:** `/tmp/nosiaral-downloads.log`

## ✅ Utilisation manuelle

Pour tester ou forcer une mise à jour immédiate:

```bash
# Mise à jour des téléchargements
node update-downloads.js

# Commit et push
node commit-push.js

# Ou en une seule commande
./daily-update.sh
```

## 📝 Notes

- Les multiplicateurs sont aléatoires à chaque exécution
- Les données sont sauvegardées localement pour traçabilité
- Chaque jour, un nouveau commit est créé avec la date
- Les logs des exécutions cron sont disponibles dans `/tmp/nosiaral-downloads.log`

## 🔍 Vérifier le prochain passage

Le cronjob est actif. Vérifiez la crontab avec:
```bash
crontab -l
```

Pour voir les logs de la dernière exécution:
```bash
tail /tmp/nosiaral-downloads.log
```
