import utils, { $ } from '../utils.js';
import C from '../constants.js';
import Tile from './Tile.js';
import Wave from './Wave.js';
export default class Map {
    constructor(game) {
        this._element = $('#map');
        this._waves = [];
        this._game = game;
        this._tilesXY = game.json.getMap().nbTiles;
        this._wavesId = game.json.getMap().waves;
        this.addWaves(...this._wavesId);
        this._currentWaveIndex = -1;
        this._currentWaves = [];
        this._tiles = this.generateTiles();
        this.generateDom();
        this.nextWave = this.nextWave.bind(this);
    }
    get game() {
        return this._game;
    }
    get waves() {
        return this._waves;
    }
    get currentWaves() {
        return this._currentWaves;
    }
    set currentWaves(waves) {
        this._currentWaves = waves;
    }
    get currentWaveIndex() {
        return this._currentWaveIndex;
    }
    get tiles() {
        return this._tiles;
    }
    getWaveId(index = this._currentWaveIndex) {
        return this._wavesId[index];
    }
    getWave(waveId = this.getWaveId()) {
        return this._waves[waveId];
    }
    generateTiles() {
        if (!this._game.json)
            return [];
        const mergedArray = this._game.json.tiles.flatMap((x) => x);
        const tilesArray = mergedArray.map((type, index) => new Tile({ type, index, map: this }));
        return tilesArray;
    }
    generateDom() {
        this._element.style.setProperty('--nbColumns', this._tilesXY.x.toString());
        this._element.style.setProperty('--nbRows', this._tilesXY.y.toString());
        this._element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);
        utils.appendChilds(this._element, this._tiles.map((tile) => tile.element));
        return this;
    }
    addWaves(...wavesId) {
        [...new Set(wavesId)].forEach((id) => (this._waves[id] = utils.getContentById(id, this.game.json.data.waves)));
    }
    nextWave() {
        this._currentWaveIndex++;
        this._currentWaves.push(this.createWave());
    }
    createWave() {
        C.LOG_WAVE && console.log('Génération de la vague', this._currentWaveIndex);
        return new Wave(this);
    }
    removeWave(waveToDelete) {
        this._currentWaves = this._currentWaves.filter((wave) => wave !== waveToDelete);
    }
    waveIteration(fn) {
        this._currentWaves.forEach(fn);
    }
    isLastWave() {
        return this._waves.length === this._currentWaveIndex + 1;
    }
    waveFinished(wave) {
        this.removeWave(wave);
        if (this.isLastWave()) {
            this.game.setPlaying(false);
        }
        else {
            this.game.setTimestampNextWave();
        }
    }
    updateStates(timestamp) {
        this.waveIteration((wave) => wave.updateStates(timestamp));
    }
}
