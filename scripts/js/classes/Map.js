import utils, { $ } from '../utils.js';
import Tile from './Tile.js';
import Wave from './Wave.js';
import C from '../constants.js';
export default class Map {
    constructor({ tiles, nbTiles, waves, jsonMonsters, jsonMapRoutes, game }) {
        this._game = game;
        this._element = $('#map');
        this._nbTiles = nbTiles;
        this._arrTiles = tiles.map((type, index) => new Tile({ type, index, map: this }));
        this._jsonMapRoutes = jsonMapRoutes;
        this._jsonMonsters = jsonMonsters;
        this._currentWaveIndex = -1;
        this._waves = waves;
        this.currentWaves = [];
        this.finished = false;
    }
    generateWave() {
        C.LOG_WAVE && console.log('Génération de la vague', this._currentWaveIndex);
        return new Wave({
            ...this._waves[this._currentWaveIndex],
            jsonMonsters: this._jsonMonsters,
            map: this,
            waveNumber: this._currentWaveIndex,
        });
    }
    nextWave() {
        if (this.finished)
            return;
        if (this._currentWaveIndex < this._waves.length - 1) {
            this._currentWaveIndex++;
            this.currentWaves.push(this.generateWave());
            this.createEvents();
        }
        else {
            this.finished = true;
        }
    }
    generateDom() {
        this._element.style.setProperty('--nbColumns', this._nbTiles.x.toString());
        this._element.style.setProperty('--nbRows', this._nbTiles.y.toString());
        this._element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);
        utils.appendChilds(this._element, this._arrTiles.map((tile) => tile.element));
    }
    getRoutes() {
        return this._jsonMapRoutes;
    }
    createEvents() {
        this.waveIteration((wave) => wave.createEvents());
    }
    updateStates(timestamp) {
        this.waveIteration((wave) => wave.updateStates(timestamp));
    }
    waveIteration(fn) {
        this.currentWaves.forEach(fn);
    }
    waveIteration2(fn) {
        return this.currentWaves.map(fn);
    }
}
