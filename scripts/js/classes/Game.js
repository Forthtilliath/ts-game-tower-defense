var _a;
import utils, { $ } from '../utils.js';
import Map from './Map.js';
export default class Game {
    constructor() {
        this.currentMap = undefined;
        this.isPlaying = false;
        this.isPlaying = true;
        this.timestamp = 0;
        this.animFrameId = 0;
        return this;
    }
    loadMap(mapId) {
        this.currentMap = new Map({
            element: $('#map'),
            tiles: utils.mergeArrays(this.datas.map[mapId].tiles),
            nbTiles: this.datas.map[mapId].nbTiles,
            waves: utils.getContentByIds(this.datas.map[mapId].waves, this.datas.waves),
            jsonMonsters: this.datas.monsters,
            jsonMapRoutes: this.datas.map[mapId].routes,
            game: this,
        });
        this.currentMap.generateDom();
    }
    play() {
        this.currentMap.nextWave();
        this.update();
    }
    stop() {
        cancelAnimationFrame(this.animFrameId);
    }
    updateStates() {
        this.currentMap.updateStates(this.timestamp);
    }
    update() {
        this.animFrameId = requestAnimationFrame(() => this.update());
        this.timestamp += 1;
        this.updateStates();
    }
}
_a = Game;
Game.CreateAsync = async () => {
    const theGame = new Game();
    theGame.datas = await utils.loadJson('../json/datas.json');
    return theGame;
};
export const GameInitialized = Game.CreateAsync();
