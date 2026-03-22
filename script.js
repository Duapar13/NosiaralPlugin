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
        downloadUrl: "plugins/SharedHealth-1.0.0.jar"
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
        downloadUrl: "plugins/NosiaralTime-1.0.0.jar"
    }
};

// Éléments du DOM
const modal = document.getElementById("pluginModal");
const modalClose = document.querySelector(".modal-close");
const pluginCards = document.querySelectorAll(".plugin-card");

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
    });
});

// Fonction pour ouvrir la modal
function openModal(pluginId) {
    const plugin = pluginsData[pluginId];
    
    if (!plugin) return;

    document.getElementById("modalTitle").textContent = plugin.title;
    document.getElementById("modalDescription").textContent = plugin.description;
    
    // Remplir les commandes
    const commandsList = document.getElementById("modalCommands");
    commandsList.innerHTML = "";
    
    plugin.commands.forEach(command => {
        const li = document.createElement("li");
        li.textContent = command;
        commandsList.appendChild(li);
    });

    // Mettre à jour le lien de téléchargement
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.href = plugin.downloadUrl;

    // Afficher la modal
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Empêcher le scroll
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
