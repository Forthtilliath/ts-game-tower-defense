var _a;
import Interface from './Interface.js';
import Json from './Json.js';
import Map from './Map.js';
export default class Game {
    constructor() {
        this._isPlaying = false;
        this._timestamp = 0;
        this._animFrameId = 0;
        this._interface = new Interface();
        return this;
    }
    get isPlaying() {
        return this._isPlaying;
    }
    get interface() {
        return this._interface;
    }
    get json() {
        return this._json;
    }
    updateInterface() {
        return this._interface.set(this._json?.player, this._json?.nbWaves);
    }
    setPlaying(newState = !this._isPlaying) {
        this._isPlaying = newState;
        this._isPlaying ? this.play() : this.stop();
    }
    loadMap(mapId) {
        if (!this._json)
            return;
        this._json.setMap(mapId);
        this._currentMap = new Map(this).generateDom();
    }
    play() {
        if (!this._currentMap)
            return;
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
    theGame._json = await Json.Load('../json/datas.json');
    theGame._datas = theGame._json.data;
    return theGame;
};
export const GameInitialized = Game.CreateAsync();
