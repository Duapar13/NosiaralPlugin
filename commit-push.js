#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const projectPath = __dirname;

// Fonction pour exécuter une commande
function runCommand(cmd, callback) {
    const childProcess = exec(cmd, { cwd: projectPath }, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Erreur: ${error.message}`);
            callback(error);
            return;
        }
        if (stdout) console.log(stdout);
        callback(null, stdout);
    });
}

// Fonction principale
function commitAndPush() {
    console.log("🔄 Synchronisation avec GitHub...\n");
    
    // Ajouter les fichiers
    runCommand("git add -A", (err) => {
        if (err) process.exit(1);
        console.log("✅ Fichiers ajoutés au staging");
        
        // Date du jour pour le commit
        const date = new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        
        const commitMsg = `📊 Mise à jour downloads - ${date}`;
        
        // Commit
        runCommand(`git commit -m "${commitMsg}"`, (err) => {
            if (err) {
                console.log("⚠️  Rien à commiter ou erreur");
                process.exit(1);
            }
            console.log("✅ Commit créé");
            
            // Push
            runCommand("git push", (err) => {
                if (err) process.exit(1);
                console.log("✅ Push réussi sur GitHub");
                console.log("🎉 Synchronisation terminée!\n");
            });
        });
    });
}

// Exécuter
commitAndPush();
