import utils, { $ } from '../utils.js';
import Tile from './Tile.js';
import Wave from './Wave.js';
import C from '../constants.js';
export default class Map {
    constructor(game) {
        this._game = game;
        this._element = $('#map');
        this._nbTiles = game.json.getMap().nbTiles;
        this._jsonMapRoutes = game.json.routes;
        this._jsonMonsters = game.json.monsters;
        this._waves = utils.getContentByIds(game.json.getMap().waves, game.json.data.waves);
        this._arrTiles = this.generateArrayOfTiles();
        this._currentWaveIndex = -1;
        this._currentWaves = [];
        this._finished = false;
    }
    get game() {
        return this._game;
    }
    get currentWaves() {
        return this._currentWaves;
    }
    set currentWaves(waves) {
        this._currentWaves = waves;
    }
    get finished() {
        return this._finished;
    }
    get waves() {
        return this._waves;
    }
    get currentWaveIndex() {
        return this._currentWaveIndex;
    }
    generateArrayOfTiles() {
        if (!this._game.json)
            return [];
        const mergedArray = this._game.json.tiles.flatMap((x) => x);
        const tilesArray = mergedArray.map((type, index) => new Tile({ type, index, map: this }));
        return tilesArray;
    }
    generateWave() {
        C.LOG_WAVE && console.log('Génération de la vague', this._currentWaveIndex);
        return new Wave({ map: this });
    }
    nextWave() {
        if (this._finished)
            return;
        if (this._currentWaveIndex < this._waves.length - 1) {
            this._currentWaveIndex++;
            this._currentWaves.push(this.generateWave());
            this.createEvents();
        }
        else {
            this._finished = true;
        }
    }
    generateDom() {
        this._element.style.setProperty('--nbColumns', this._nbTiles.x.toString());
        this._element.style.setProperty('--nbRows', this._nbTiles.y.toString());
        this._element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);
        utils.appendChilds(this._element, this._arrTiles.map((tile) => tile.element));
        return this;
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
        this._currentWaves.forEach(fn);
    }
    waveIteration2(fn) {
        return this._currentWaves.map(fn);
    }
}
