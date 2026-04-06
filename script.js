// Webhooks Discord
const DISCORD_WEBHOOK_VISITOR = "https://discord.com/api/webhooks/1485378078095048775/UJeIBnkcbnevmcDLISAcjR9vQ0XHWnZ--iP5R93V-On9-Wm640ShdzRJlibp_11YiiPD";
const DISCORD_WEBHOOK_DOWNLOAD = "https://discord.com/api/webhooks/1485378684272775380/bNQXnAvRkk_PcCMnFQaCPr9AwxhKnq0tTWhWMZDCMsarg9XG_IedCkLYQgAGaS_mwQYE";

// Fonction pour afficher la notification de collecte de données
function showDataCollectionNotice() {
    // Vérifier si l'utilisateur a déjà accepté la notification
    const noticeAccepted = localStorage.getItem('dataCollectionNoticeAccepted');
    
    if (noticeAccepted) {
        return; // L'utilisateur a déjà accepté, ne pas afficher
    }
    
    // Afficher la modal de notification
    const noticeModal = document.getElementById('dataCollectionNotice');
    if (noticeModal) {
        noticeModal.style.display = 'block';
        
        // Bouton fermer
        const closeBtn = document.getElementById('closeNoticeBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                noticeModal.style.display = 'none';
                localStorage.setItem('dataCollectionNoticeAccepted', 'true');
            });
        }
        
        // Bouton J'ai compris
        const acceptBtn = document.getElementById('acceptNoticeBtn');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                noticeModal.style.display = 'none';
                localStorage.setItem('dataCollectionNoticeAccepted', 'true');
            });
        }
        
        // Fermer en cliquant en dehors du contenu
        window.addEventListener('click', (event) => {
            if (event.target === noticeModal) {
                noticeModal.style.display = 'none';
                localStorage.setItem('dataCollectionNoticeAccepted', 'true');
            }
        });
    }
}

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
            { command: "/sharedhealth reload", description: "Recharge le plugin" },
            { command: "/sharedhealth status", description: "Affiche le statut actuel" },
            { command: "/sharedhealth sethealth <cœurs>", description: "Définit la vie partagée entre les joueurs" },
            { command: "/sharedhealth bigdamage", description: "Active le mode dégâts importants" }
        ],
        downloadUrl: "plugins/SharedHealth-1.0.0.jar",
        downloads: 265,
        dateAdded: "2025-08-15",
        details: [
            "❤️ <strong>Vie partagée :</strong> Tous les joueurs partagent la même barre de vie",
            "📦 <strong>Inventaire :</strong> Synchronisation complète entre les joueurs",
            "⚙️ <strong>Configuration :</strong> Entièrement customisable",
            "🎮 <strong>Mode :</strong> Parfait pour les défis coopératifs"
        ]
    },
    timeaccel: {
        title: "J'ACCELERE LE JEU mais IL NE PEUT PAS LE PROUVER",
        description: "Contrôlez la vitesse du temps dans votre monde Minecraft. Accélérez les cycles jour/nuit, les croissances de cultures ou tout simplement pour capter du contenu plus rapidement.",
        commands: [
            { command: "/time speed <multiplicateur>", description: "Défini la vitesse (ex: 2 pour 2x plus rapide)" },
            { command: "/time normal", description: "Retour à la vitesse normale" },
            { command: "/time pause", description: "Pause le temps" },
            { command: "/time resume", description: "Reprend le temps" },
            { command: "/time status", description: "Affiche la vitesse actuelle" }
        ],
        downloadUrl: "plugins/NosiaralTime-1.0.0.jar",
        downloads: 106,
        dateAdded: "2025-10-22",
        details: [
            "⚡ <strong>Vitesse variable :</strong> Accélération de 1x à 16x",
            "🌅 <strong>Cycles :</strong> Affecte jour/nuit et croissance des cultures",
            "⏸️ <strong>Pause/Reprendre :</strong> Contrôle complet du temps",
            "📹 <strong>Contenu :</strong> Parfait pour les vidéos YouTube"
        ]
    },
    deathswap: {
        title: "On Échange de Place toute les 5 Minutes, le Survivant Gagne !",
        description: "Un plugin pour les défis Death Swap ! Tous les joueurs échangent de place automatiquement toutes les 5 minutes. Le dernier joueur survivant remporte la victoire. Parfait pour du contenu intense et imprévisible.",
        commands: [
            { command: "/deathswap setspawn", description: "Définit le point de spawn (au-dessus de y 100)" },
            { command: "/deathswap start", description: "Démarre la game" },
            { command: "/deathswap stop", description: "Arrête la game" }
        ],
        downloadUrl: "plugins/DeathSwapNosiaral-1.0.0.jar",
        downloads: 0,
        dateAdded: "2026-04-05",
        details: [
            "🧭 <strong>Sélection d'équipe :</strong> Les joueurs spawn avec une boussole pour choisir leur équipe",
            "⏱️ <strong>Intervalle :</strong> Échange de position toutes les 5 minutes",
            "🎮 <strong>Mécanique :</strong> Choisir l'équipe lance automatiquement la game",
            "📍 <strong>Spawn :</strong> Position définie au-dessus de y 100 pour sécurité"
        ]
    }
};

// Récupérer les plugins triés par date (récents en premier)
function getSortedPlugins() {
    return Object.keys(pluginsData).sort((a, b) => {
        const dateA = new Date(pluginsData[a].dateAdded);
        const dateB = new Date(pluginsData[b].dateAdded);
        return dateB - dateA; // Récents en premier
    });
}

// Réorganiser les plugins par date dans le DOM
function reorderPluginsByDate() {
    const pluginsGrid = document.querySelector('.plugins-grid');
    if (!pluginsGrid) return;
    
    const sortedPluginIds = getSortedPlugins();
    const pluginCards = {};
    
    // Créer une map des cartes par ID
    document.querySelectorAll('.plugin-card').forEach(card => {
        const pluginId = card.dataset.plugin;
        pluginCards[pluginId] = card;
    });
    
    // Réinsérer les cards dans l'ordre trié
    sortedPluginIds.forEach(pluginId => {
        if (pluginCards[pluginId]) {
            pluginsGrid.appendChild(pluginCards[pluginId]);
        }
    });
}

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
    // Afficher la notification de collecte de données
    showDataCollectionNotice();
    
    // Réorganiser les plugins par date (récents en premier)
    reorderPluginsByDate();
    
    // Afficher les compteurs de téléchargement
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
        
        // Afficher le compteur de téléchargement et la date
        document.getElementById("modalDownloadCount").textContent = plugin.downloads;
        const dateAdded = document.getElementById("modalDateAdded");
        if (plugin.dateAdded) {
            const date = new Date(plugin.dateAdded);
            const formattedDate = date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
            dateAdded.textContent = `📅 Ajouté le ${formattedDate}`;
        }
        
        // Remplir les commandes
        const commandsList = document.getElementById("modalCommands");
        commandsList.innerHTML = "";
        
        plugin.commands.forEach(commandItem => {
            const li = document.createElement("li");
            li.style.marginBottom = "10px";
            
            if (typeof commandItem === "string") {
                // Ancien format (rétrocompatibilité)
                li.textContent = commandItem;
            } else {
                // Nouveau format avec objets
                const commandCode = document.createElement("code");
                commandCode.textContent = commandItem.command;
                commandCode.style.backgroundColor = "#f5f5f5";
                commandCode.style.padding = "4px 8px";
                commandCode.style.borderRadius = "4px";
                commandCode.style.fontWeight = "bold";
                
                const descSpan = document.createElement("span");
                descSpan.textContent = " — " + commandItem.description;
                descSpan.style.marginLeft = "8px";
                descSpan.style.color = "#666";
                
                li.appendChild(commandCode);
                li.appendChild(descSpan);
            }
            commandsList.appendChild(li);
        });
        
        // Afficher la section détails si disponible
        const detailsSection = document.getElementById("detailsSection");
        if (plugin.details && plugin.details.length > 0) {
            detailsSection.style.display = "block";
            const detailsContent = document.getElementById("modalDetails");
            detailsContent.innerHTML = "";
            
            plugin.details.forEach(detail => {
                const detailDiv = document.createElement("div");
                detailDiv.style.marginBottom = "8px";
                detailDiv.style.padding = "8px";
                detailDiv.style.borderLeft = "3px solid #007bff";
                detailDiv.style.paddingLeft = "12px";
                detailDiv.innerHTML = detail;
                detailsContent.appendChild(detailDiv);
            });
        } else {
            detailsSection.style.display = "none";
        }

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

