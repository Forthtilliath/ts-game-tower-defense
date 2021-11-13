import { GameInitialized } from './classes/Game.js';
const btn_startWave = document.querySelector('#startWave');
GameInitialized.then((myGame) => {
    const mapNum = 0;
    myGame.loadMap(mapNum);
    btn_startWave.style.setProperty('display', 'block');
    btn_startWave.addEventListener('click', () => handleGame(myGame));
});
function handleGame(theGame) {
    theGame.setPlaying();
    btn_startWave.textContent = theGame.isPlaying ? 'Pause' : 'Lecture';
}
