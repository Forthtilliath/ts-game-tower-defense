var _a;
import { LogStyles } from '../constants.js';
import C from '../constants.js';
import Interface from './Interface.js';
import Json from './Json.js';
import Map from './Map.js';
export default class Game {
    constructor() {
        this._isPlaying = false;
        this._timestamp = 0;
        this._animFrameId = 0;
        this._interface = new Interface();
        this._timestampNextWave = 0;
        this._delaiBetweenWaves = C.WAVE_DELAI * 60;
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
    get timestamp() {
        return this._timestamp;
    }
    get delaiBetweenWaves() {
        return this._delaiBetweenWaves;
    }
    setTimestampNextWave() {
        return this._timestampNextWave = this._timestamp + this._delaiBetweenWaves;
    }
    loadMap(mapId) {
        if (!this._json)
            return;
        this._json.setMap(mapId);
        this._currentMap = new Map(this);
        this.updateInterface();
    }
    updateInterface() {
        return this._interface.set(this.json.player, this.json.nbWaves);
    }
    setPlaying(newState = !this._isPlaying) {
        console.log('change state');
        this._isPlaying = newState;
        this._isPlaying ? this.play() : this.stop();
    }
    play() {
        this.update();
    }
    stop() {
        cancelAnimationFrame(this._animFrameId);
    }
    update() {
        if (!this._currentMap) {
            console.error(`%cErreur, pas de carte chargée !`, LogStyles.error);
            return;
        }
        this._animFrameId = requestAnimationFrame(() => this.update());
        if (this._timestamp === this._timestampNextWave) {
            this._currentMap.nextWave();
        }
        this._timestamp += 1;
        this._currentMap.updateStates(this._timestamp);
    }
}
_a = Game;
Game.CreateAsync = async () => {
    const theGame = new Game();
    theGame._json = await Json.Load('../json/datas.json');
    return theGame;
};
export const GameInitialized = Game.CreateAsync();
