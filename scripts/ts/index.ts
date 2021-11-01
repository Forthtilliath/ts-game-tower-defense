import Game, { GameInitialized } from './classes/Game.js';
import Interface from './classes/Interface.js';
import utils from './utils.js';

const btn_startWave = document.querySelector('#startWave') as HTMLElement;



// GameInitialized représente le jeu avec le json contenant toutes les données chargées
GameInitialized.then((myGame) => {
    const mapNum = 1;
    // Charge la map numéro 1
    myGame.loadMap(mapNum);
    // myGame.json!.map = mapNum;
    
    // Met à jour l'interface à partir des données du json
    myGame.updateInterface();

    // console.log(myGame.json?.getMap());
    // const myInterface = new Interface(myGame.json?.player, myGame.json?.getMap()?.waves.length);

    // Le jeu est chargé, on peut donc afficher le bouton et ajouter l'event
    btn_startWave.style.setProperty('display', 'block');
    btn_startWave.addEventListener('click', () => handleGame(myGame));

    // window.addEventListener('build', (e: any) => handleBuild(myInterface, e.detail));
});

/** Event du bouton de l'état du jeu */
function handleGame(theGame: Game) {
    theGame.setPlaying();
    btn_startWave.textContent = theGame.isPlaying ? 'Pause' : 'Lecture';
}

// function handleBuild(theInterface: Interface, detail: any) {
//     // theGame.
//     utils.launchEvent('changeinterface', { gold: 100 });
//     console.log(detail);
// }

/**
 * Clic sur une case pour construire une tourelle
 * Vérifie si assez d'or pour construire
 * Si assez :
 *  - construction de la tourelle
 *  - réduction gold
 */