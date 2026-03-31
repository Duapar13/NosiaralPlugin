#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Chemin des fichiers
const dataFile = path.join(__dirname, "downloads-data.json");
const scriptFile = path.join(__dirname, "script.js");

// Fonction pour générer un multiplicateur aléatoire entre 1.2 et 1.8
function getRandomMultiplier() {
    return 1.2 + Math.random() * (1.8 - 1.2);
}

// Fonction pour arrondir de manière cohérente
function roundDownloads(num) {
    return Math.round(num);
}

// Fonction pour appliquer l'augmentation 3 fois
function applyMultiplier(current, multiplier) {
    let value = current;
    for (let i = 0; i < 3; i++) {
        value = value * multiplier;
    }
    return roundDownloads(value);
}

// Lire le fichier de données
function readDownloadsData() {
    try {
        return JSON.parse(fs.readFileSync(dataFile, "utf8"));
    } catch (error) {
        console.error("Erreur de lecture du fichier de données:", error.message);
        process.exit(1);
    }
}

// Écrire le fichier de données
function writeDownloadsData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
}

// Mettre à jour le script.js
function updateScript(inventory, timeaccel) {
    try {
        let content = fs.readFileSync(scriptFile, "utf8");
        
        // Remplacer les valeurs de downloads
        content = content.replace(
            /downloads: \d+\s*\n\s*\},\s*\n\s*timeaccel:/,
            `downloads: ${inventory}\n    },\n    timeaccel:`
        );
        content = content.replace(
            /timeaccel: \{[\s\S]*?downloads: \d+/,
            `timeaccel: {
        title: "J'ACCELERE LE JEU mais IL NE PEUT PAS LE PROUVER",
        description: "Contrôlez la vitesse du temps dans votre monde Minecraft. Accélérez les cycles jour/nuit, les croissances de cultures ou tout simplement pour capter du contenu plus rapidement.",
        commands: [
            "/time speed <multiplicateur> - Défini la vitesse (ex: 2 pour 2x plus rapide)",
            "/time normal - Retour à la vitesse normale",
            "/time pause - Pause le temps",
            "/time resume - Reprend le temps",
            "/time status - Affiche la vitesse actuelle"
        ],
        downloadUrl: "plugins/NosiaralTime-1.0.0.jar",
        downloads: ${timeaccel}`
        );
        
        fs.writeFileSync(scriptFile, content, "utf8");
        console.log("✅ script.js mis à jour");
    } catch (error) {
        console.error("Erreur de mise à jour du script:", error.message);
        process.exit(1);
    }
}

// Fonction principale
function updateDownloads() {
    console.log("📊 Mise à jour des téléchargements...\n");
    
    // Lire les données actuelles
    const data = readDownloadsData();
    
    // Générer les nouveaux multiplicateurs
    const inventoryMultiplier = getRandomMultiplier();
    const timeaccelMultiplier = getRandomMultiplier();
    
    console.log(`🎲 Multiplicateurs générés:`);
    console.log(`   Inventory: ${inventoryMultiplier.toFixed(2)}`);
    console.log(`   TimeAccel: ${timeaccelMultiplier.toFixed(2)}\n`);
    
    // Appliquer les multiplicateurs 3 fois
    const newInventory = applyMultiplier(data.inventory.current, inventoryMultiplier);
    const newTimeaccel = applyMultiplier(data.timeaccel.current, timeaccelMultiplier);
    
    console.log(`📈 Augmentations (x3 appliquée):`);
    console.log(`   Inventory: ${data.inventory.current} → ${newInventory} (+${newInventory - data.inventory.current})`);
    console.log(`   TimeAccel: ${data.timeaccel.current} → ${newTimeaccel} (+${newTimeaccel - data.timeaccel.current})\n`);
    
    // Mettre à jour les données
    data.inventory.current = newInventory;
    data.inventory.lastUpdate = new Date().toISOString();
    data.inventory.multiplier = inventoryMultiplier;
    
    data.timeaccel.current = newTimeaccel;
    data.timeaccel.lastUpdate = new Date().toISOString();
    data.timeaccel.multiplier = timeaccelMultiplier;
    
    // Sauvegarder
    writeDownloadsData(data);
    updateScript(newInventory, newTimeaccel);
    
    console.log("✅ Données sauvegardées\n");
}

// Exécuter la mise à jour
updateDownloads();
