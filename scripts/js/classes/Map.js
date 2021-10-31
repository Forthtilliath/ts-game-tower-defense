import utils from '../utils.js';
import Tile from './Tile.js';
import Wave from './Wave.js';
import C from '../constants.js';
export default class Map {
    constructor({ element, tiles, nbTiles, waves, jsonMonsters, jsonMapRoutes, game }) {
        this.game = game;
        this.element = element;
        this.nbTiles = nbTiles;
        this.arrTiles = tiles.map((type, index) => new Tile({ type, index }));
        this.jsonMapRoutes = jsonMapRoutes;
        this.jsonMonsters = jsonMonsters;
        this.currentWaveIndex = -1;
        this.waves = waves;
        this.currentWaves = [];
        this.finished = false;
    }
    generateWave() {
        console.log('Génération de la vague', this.currentWaveIndex);
        return new Wave({
            ...this.waves[this.currentWaveIndex],
            jsonMonsters: this.jsonMonsters,
            map: this,
            waveNumber: this.currentWaveIndex,
        });
    }
    nextWave() {
        if (this.finished)
            return;
        if (this.currentWaveIndex < this.waves.length - 1) {
            this.currentWaveIndex++;
            this.currentWaves.push(this.generateWave());
            this.createEvents();
        }
        else {
            this.finished = true;
        }
    }
    generateDom() {
        this.element.style.setProperty('--nbColumns', this.nbTiles.x.toString());
        this.element.style.setProperty('--nbRows', this.nbTiles.y.toString());
        this.element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);
        utils.appendChilds(this.element, this.arrTiles.map((tile) => tile.element));
    }
    getRoutes() {
        return this.jsonMapRoutes;
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
