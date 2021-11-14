import utils, { $ } from '../utils.js';
import C from '../constants.js';
import Tile from './Tile.js';
import Wave from './Wave.js';
/**
 * La classe Map est l'un des plus importantes de l'application.
 *
 * Au début du programme, elle va générer l'ensemble des cases du jeu.
 *
 * Pas la suite, elle va gérer les vagues : de leur création à leur suppression.
 */
export default class Map {
    constructor(game) {
        /** Element dans le DOM */
        this._element = $('#map');
        /**
         * Tableau contenant l'ensemble des vagues de la map
         *
         * Si la map contient les vagues avec les id 0 et 2, le tableau aura une vague à
         * l'index 0 et 2.
         *
         * L'index 1 restera vide.
         */
        this._waves = [];
        this._game = game;
        this._tilesXY = game.json.getMap().nbTiles;
        this._wavesId = game.json.getMap().waves;
        this.addWaves(...this._wavesId);
        this._currentWaveIndex = -1;
        // this._finished = false;
        this._currentWaves = [];
        this._tiles = this.generateTiles();
        this.generateDom();
        // Bind certaines méthodes pour conserver le this
        // Utile pour setTimeout, addEventListener par exemple
        this.nextWave = this.nextWave.bind(this);
    }
    //=======================
    // GETTERS ET SETTERS
    //=======================
    get game() {
        return this._game;
    }
    // public get finished() {
    //     return this._finished;
    // }
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
    //=======================
    // METHODES
    //=======================
    /** Transforme le tableau des types cases de la map en un tableau de Tile */
    generateTiles() {
        if (!this._game.json)
            return [];
        const mergedArray = this._game.json.tiles.flatMap((x) => x);
        const tilesArray = mergedArray.map((type, index) => new Tile({ type, index, map: this }));
        return tilesArray;
    }
    /** Génère le DOM en fonction du tableau des cases */
    generateDom() {
        // Modifie les variables CSS pour adapter le grid en fonction du nombre de cases en X et Y
        this._element.style.setProperty('--nbColumns', this._tilesXY.x.toString());
        this._element.style.setProperty('--nbRows', this._tilesXY.y.toString());
        this._element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);
        // Ajoute les cases dans la map
        utils.appendChilds(this._element, this._tiles.map((tile) => tile.element));
        return this;
    }
    /** Ajoute les données json d'une vague à partir de l'id de la vague. */
    addWaves(...wavesId) {
        [...new Set(wavesId)].forEach((id) => (this._waves[id] = utils.getContentById(id, this.game.json.data.waves)));
    }
    /** Passe à la vague suivante */
    nextWave() {
        this._currentWaveIndex++;
        this._currentWaves.push(this.createWave());
    }
    /** Génère une nouvelle vague à partir de l'index de la vague courante */
    createWave() {
        C.LOG_WAVE && console.log('Génération de la vague', this._currentWaveIndex);
        return new Wave(this);
    }
    /** Supprime la vague du tableau des vagues en cours */
    removeWave(waveToDelete) {
        this._currentWaves = this._currentWaves.filter((wave) => wave !== waveToDelete);
    }
    /** Boucle le tableau des vagues de monstres actuellement sur la carte */
    waveIteration(fn) {
        this._currentWaves.forEach(fn);
    }
    /** Vérifie si la vague en cours est la dernière vague de la map */
    isLastWave() {
        return this._waves.length === this._currentWaveIndex + 1;
    }
    /** Actions lorsqu'une vague est terminée */
    waveFinished(wave) {
        this.removeWave(wave);
        if (this.isLastWave()) {
            this.game.setPlaying(false);
        }
        else {
            this.game.setTimestampNextWave();
        }
    }
    //=======================
    // ANIMATION
    //=======================
    /**
     * Met à jour chaque vague, car même si le joueur est à la vague 2, il peut rester
     * des monstres des vagues précédentes à faire avancer.
     */
    updateStates(timestamp) {
        this.waveIteration((wave) => wave.updateStates(timestamp));
    }
}
