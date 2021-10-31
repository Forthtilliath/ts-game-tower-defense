var _a;
import utils, { $ } from '../utils.js';
import Map from './Map.js';
export default class Game {
    constructor() {
        this._currentMap = undefined;
        this._isPlaying = false;
        this._timestamp = 0;
        this._animFrameId = 0;
        return this;
    }
    get isPlaying() {
        return this._isPlaying;
    }
    setPlaying(newState = !this._isPlaying) {
        this._isPlaying = newState;
        this._isPlaying ? this.play() : this.stop();
    }
    loadMap(mapId) {
        this._currentMap = new Map({
            element: $('#map'),
            tiles: utils.mergeArrays(this._datas.map[mapId].tiles),
            nbTiles: this._datas.map[mapId].nbTiles,
            waves: utils.getContentByIds(this._datas.map[mapId].waves, this._datas.waves),
            jsonMonsters: this._datas.monsters,
            jsonMapRoutes: this._datas.map[mapId].routes,
            game: this,
        });
        this._currentMap.generateDom();
    }
    play() {
        this._currentMap.nextWave();
        this.update();
    }
    stop() {
        cancelAnimationFrame(this._animFrameId);
    }
    updateStates() {
        this._currentMap.updateStates(this._timestamp);
    }
    update() {
        this._animFrameId = requestAnimationFrame(() => this.update());
        this._timestamp += 1;
        this.updateStates();
    }
}
_a = Game;
Game.CreateAsync = async () => {
    const theGame = new Game();
    theGame._datas = await utils.loadJson('../json/datas.json');
    return theGame;
};
export const GameInitialized = Game.CreateAsync();
