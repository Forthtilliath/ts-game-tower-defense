import Game from './classes/Game.js';
Game.then(myGame => {
    myGame.loadMap(0);
    myGame.play();
});
