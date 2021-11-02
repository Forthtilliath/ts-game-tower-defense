import Game, { GameInitialized } from './classes/Game.js';

const btn_startWave = document.querySelector('#startWave') as HTMLElement;

// GameInitialized représente le jeu avec le json contenant toutes les données chargées
GameInitialized.then((myGame) => {
    const mapNum = 1;
    // Charge la map numéro 1
    myGame.loadMap(mapNum);
    
    // Met à jour l'interface à partir des données du json
    myGame.updateInterface();

    // Le jeu est chargé, on peut donc afficher le bouton et ajouter l'event
    btn_startWave.style.setProperty('display', 'block');
    btn_startWave.addEventListener('click', () => handleGame(myGame));
});

/** Event du bouton de l'état du jeu */
function handleGame(theGame: Game) {
    theGame.setPlaying();
    btn_startWave.textContent = theGame.isPlaying ? 'Pause' : 'Lecture';
}

/**
 * Clic sur une case pour construire une tourelle
 * Vérifie si assez d'or pour construire
 * Si assez :
 *  - construction de la tourelle
 *  - réduction gold
 */