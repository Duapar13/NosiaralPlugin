// Webhooks Discord
const DISCORD_WEBHOOK_VISITOR = "https://discord.com/api/webhooks/1485378078095048775/UJeIBnkcbnevmcDLISAcjR9vQ0XHWnZ--iP5R93V-On9-Wm640ShdzRJlibp_11YiiPD";
const DISCORD_WEBHOOK_DOWNLOAD = "https://discord.com/api/webhooks/1485378684272775380/bNQXnAvRkk_PcCMnFQaCPr9AwxhKnq0tTWhWMZDCMsarg9XG_IedCkLYQgAGaS_mwQYE";

// Fonction pour envoyer un message au webhook Discord
async function sendDiscordWebhook(data, webhookUrl) {
    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log("Webhook envoyé");
    }
}

// Fonction pour envoyer un webhook à l'arrivée sur le site
function sendVisitorWebhook() {
    const now = new Date();
    const embed = {
        embeds: [
            {
                title: "👤 Nouveau visiteur sur le site",
                color: 3447003,
                fields: [
                    {
                        name: "🕐 Heure",
                        value: now.toLocaleString("fr-FR"),
                        inline: true
                    },
                    {
                        name: "🌍 Navigateur",
                        value: navigator.userAgent.substring(0, 100),
                        inline: false
                    },
                    {
                        name: "🗺️ Langue",
                        value: navigator.language,
                        inline: true
                    },
                    {
                        name: "📱 Plateforme",
                        value: navigator.platform,
                        inline: true
                    }
                ],
                footer: {
                    text: "Nosiaral Plugins Tracker"
                },
                timestamp: now.toISOString()
            }
        ]
    };
    sendDiscordWebhook(embed, DISCORD_WEBHOOK_VISITOR);
}

// Fonction pour envoyer un webhook lors du téléchargement
function sendDownloadWebhook(pluginName, pluginUrl) {
    const now = new Date();
    const embed = {
        embeds: [
            {
                title: "⬇️ Téléchargement de Plugin",
                color: 65280,
                fields: [
                    {
                        name: "📦 Plugin",
                        value: pluginName,
                        inline: false
                    },
                    {
                        name: "🕐 Heure",
                        value: now.toLocaleString("fr-FR"),
                        inline: true
                    },
                    {
                        name: "🌍 Navigateur",
                        value: navigator.userAgent.substring(0, 100),
                        inline: false
                    },
                    {
                        name: "🗺️ Langue",
                        value: navigator.language,
                        inline: true
                    }
                ],
                footer: {
                    text: "Nosiaral Plugins Tracker"
                },
                timestamp: now.toISOString()
            }
        ]
    };
    sendDiscordWebhook(embed, DISCORD_WEBHOOK_DOWNLOAD);
}

// Données des plugins
const pluginsData = {
    inventory: {
        title: "6 GARS en Hardcore avec INVENTAIRE et PV PARTAGÉS",
        description: "Ce plugin synchronise l'inventaire et les points de vie de tous les joueurs du serveur. Tous les joueurs partagent la même barre de vie. Parfait pour les défis coopératifs où tous les joueurs partagent les mêmes ressources et la même santé.",
        commands: [
            "/sharedhealth ou /sh reload - Recharge le plugin",
            "/sharedhealth status - Affiche le statut actuel",
            "/sharedhealth sethealth - Définit la vie partagée entre les joueurs",
            "/sharedhealth bigdamage - Active le mode dégâts importants"
        ],
        downloadUrl: "plugins/SharedHealth-1.0.0.jar",
        downloads: 265
    },
    timeaccel: {
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
        downloads: 106
    }
};

// Afficher les compteurs de téléchargement
function displayDownloadCounts() {
    Object.keys(pluginsData).forEach(pluginId => {
        const count = pluginsData[pluginId].downloads;
        const countElements = document.querySelectorAll(`[data-plugin="${pluginId}"] .count`);
        countElements.forEach(element => {
            element.textContent = count;
        });
    });
}

// Incrémenter le compteur de téléchargement
function incrementDownloadCount(pluginId) {
    const newCount = ++pluginsData[pluginId].downloads;
    
    // Mettre à jour l'affichage sur la card
    const countElements = document.querySelectorAll(`[data-plugin="${pluginId}"] .count`);
    countElements.forEach(element => {
        element.textContent = newCount;
    });
    
    // Mettre à jour l'affichage dans la modal si elle est ouverte
    const modalDownloadCount = document.getElementById("modalDownloadCount");
    if (modalDownloadCount) {
        modalDownloadCount.textContent = newCount;
    }
}

// Attendre que le DOM soit chargé avant d'initialiser
document.addEventListener("DOMContentLoaded", () => {
    // Afficher les compteurs de téléchargement
    displayDownloadCounts();
    displayDownloadCounts();
    
    // Éléments du DOM
    const modal = document.getElementById("pluginModal");
    const modalClose = document.querySelector(".modal-close");
    const pluginCards = document.querySelectorAll(".plugin-card");
    const downloadBtn = document.getElementById("downloadBtn");

    console.log("DOM chargé, downloadBtn:", downloadBtn);

    // Fermer la modal quand on clique sur le X
    modalClose.addEventListener("click", closeModal);

    // Fermer la modal quand on clique en dehors
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Ajouter les événements click sur les cards
    pluginCards.forEach(card => {
        card.addEventListener("click", () => {
            const pluginId = card.dataset.plugin;
            openModal(pluginId);
            // Envoyer le webhook quand on clique sur la card
            const plugin = pluginsData[pluginId];
            if (plugin) {
                console.log("Plugin cliqué:", plugin.title);
                sendDownloadWebhook(plugin.title, plugin.downloadUrl);
            }
        });
    });

    // Variable globale pour stocker les données du plugin actuel
    let currentPlugin = null;
    let currentPluginId = null;

    // Fonction pour ouvrir la modal
    function openModal(pluginId) {
        const plugin = pluginsData[pluginId];
        
        if (!plugin) return;

        // Stocker le plugin actuel
        currentPlugin = plugin;
        currentPluginId = pluginId;

        document.getElementById("modalTitle").textContent = plugin.title;
        document.getElementById("modalDescription").textContent = plugin.description;
        
        // Afficher le compteur de téléchargement
        document.getElementById("modalDownloadCount").textContent = plugin.downloads;
        
        // Remplir les commandes
        const commandsList = document.getElementById("modalCommands");
        commandsList.innerHTML = "";
        
        plugin.commands.forEach(command => {
            const li = document.createElement("li");
            li.textContent = command;
            commandsList.appendChild(li);
        });

        // Afficher la modal
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Empêcher le scroll
    }

    // Ajouter l'événement click au bouton télécharger
    if (downloadBtn) {
        downloadBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Bouton cliqué! currentPlugin:", currentPlugin);
            if (currentPlugin) {
                console.log("Téléchargement de:", currentPlugin.title);
                // Incrémenter le compteur
                incrementDownloadCount(currentPluginId);
                // Envoyer le webhook
                sendDownloadWebhook(currentPlugin.title, currentPlugin.downloadUrl);
                // Petit délai pour laisser le temps au webhook d'être envoyé
                setTimeout(() => {
                    const link = document.createElement("a");
                    link.href = currentPlugin.downloadUrl;
                    link.download = currentPlugin.downloadUrl.split("/").pop();
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, 100);
            }
        });
    }

    // Fonction pour fermer la modal
    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Rétablir le scroll
    }

    // Fermer la modal avec la touche Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    // Envoyer un webhook à l'arrivée sur le site
    sendVisitorWebhook();
});

