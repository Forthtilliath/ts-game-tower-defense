import Game, { GameInitialized } from './classes/Game.js';

const btn_startWave = document.querySelector('#startWave') as HTMLElement;
let started = false;

// 
GameInitialized.then((myGame) => {
    // Charge la map numéro 1
    myGame.loadMap(1);

    btn_startWave.style.setProperty('display', 'block');
    btn_startWave.addEventListener('click', () => handleGame(myGame));
});

function handleGame(theGame: Game) {
    started ? theGame.stop() : theGame.play();
    started = !started;
    btn_startWave.textContent = started ? 'Pause' : 'Lecture'
}
