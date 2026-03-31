#!/bin/bash

# Script pour configurer le cronjob automatique
# Ce script s'exécute chaque jour à 2h du matin, puis commit et push les changements

PROJECT_PATH="/Users/duapar/Documents/PROGRAMING/Perso/NosiaralWebsite"

# Exécuter le script de mise à jour
node "$PROJECT_PATH/update-downloads.js"

# Faire le commit et push
node "$PROJECT_PATH/commit-push.js"
