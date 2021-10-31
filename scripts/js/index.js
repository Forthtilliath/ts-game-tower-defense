import { GameInitialized } from './classes/Game.js';
const btn_startWave = document.querySelector('#startWave');
let started = false;
GameInitialized.then((myGame) => {
    myGame.loadMap(1);
    btn_startWave.style.setProperty('display', 'block');
    btn_startWave.addEventListener('click', () => handleGame(myGame));
});
function handleGame(theGame) {
    started ? theGame.stop() : theGame.play();
    started = !started;
    btn_startWave.textContent = started ? 'Pause' : 'Lecture';
}
