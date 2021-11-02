import utils, { $ } from '../utils.js';
import Tile from './Tile.js';
import Wave from './Wave.js';
import C from '../constants.js';
import Game from './Game.js';

/**
 * La classe Map gère tout ce qui est en rapport avec la map.
 *
 * + generateDom() : Génère le DOM en fonction du tableau des cases
 * + getRoutes() : Retourne les routes de la map
 * + createEvents() : Génère les évènements de la map
 */
export default class Map {
    public _game: Game;
    /** Element dans le DOM */
    private _element: HTMLDivElement;
    /** Nombre de cases en X et Y */
    private _nbTiles: { x: number; y: number };
    /** Tableau contenant toutes les cases */
    public _arrTiles: Tile[];
    /** Tableau des routes de la map (valeurs brut du json) */
    private _jsonMapRoutes: number[][];
    /** Tableau des monstres (valeurs brut du json) */
    private _jsonMonsters: TJsonMonster[];
    /** Vague courante, démarre à -1 */
    private _currentWaveIndex: number;
    /** Tableau contenant l'ensemble des vagues de la map */
    private _waves: object[];
    /************************************
     * Tableau contenant l'ensemble des vagues présentes sur la map
     *
     * A chaque nouvelle vague, celle-ci est ajouté dans ce tableau. Dès le dernière monstre de la
     * vague sortie de la map, la vague est supprimée du tableau.
     *
     * NOTE A améliorer plus tard, car si le tableau waves vaut [0, 1, 0],
     *      on chargera 2 fois les données de la wave 0 plutot que de réutiliser celles déjà récupérées.
     * Tableau waves[idMap] = Wave
     */
    public _currentWaves: Wave[];
    /** Contient l'état du jeu */
    public _finished: boolean;

    constructor(game: Game) {
        this._game = game;
        this._element = $('#map') as HTMLDivElement;
        this._nbTiles = game.json.getMap().nbTiles;
        this._jsonMapRoutes = game.json.routes;
        this._jsonMonsters = game.json.monsters;
        this._waves = utils.getContentByIds(game.json.getMap().waves, game.json.data.waves);
        this._arrTiles = this.generateArrayOfTiles();
        this._currentWaveIndex = -1;
        this._currentWaves = [];
        this._finished = false;
    }

    generateArrayOfTiles() {
        if (!this._game.json) return [];

        const mergedArray = this._game.json.tiles.flatMap((x: any) => x);
        const tilesArray = mergedArray.map((type, index) => new Tile({ type, index, map: this }));
        return tilesArray;
    }

    /** Génère une nouvelle vague à partir de l'index de la vague courante */
    generateWave(): Wave {
        C.LOG_WAVE && console.log('Génération de la vague', this._currentWaveIndex);
        // NOTE modifier map par routes ?
        return new Wave({
            ...this._waves[this._currentWaveIndex],
            jsonMonsters: this._jsonMonsters,
            map: this,
            waveNumber: this._currentWaveIndex,
        } as TWave);
    }

    /** Passe à la vague suivante */
    nextWave() {
        if (this._finished) return;

        if (this._currentWaveIndex < this._waves.length - 1) {
            this._currentWaveIndex++;
            this._currentWaves.push(this.generateWave());
            this.createEvents();
        } else {
            this._finished = true;
        }
    }

    /** Génère le DOM en fonction du tableau des cases */
    generateDom() {
        // Modifie les variables CSS pour adapter le grid en fonction du nombre de cases en X et Y
        this._element.style.setProperty('--nbColumns', this._nbTiles.x.toString());
        this._element.style.setProperty('--nbRows', this._nbTiles.y.toString());
        this._element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);

        // Ajoute les cases dans la map
        utils.appendChilds(
            this._element,
            this._arrTiles.map((tile) => tile.element),
        );

        return this;
    }

    /** Retourne les routes de la map */
    getRoutes() {
        return this._jsonMapRoutes;
    }

    /** Génère les évènements de la map */
    createEvents() {
        // Démarre la vague courrante
        // this.arrWaves[this.currentWaveIndex].launchWave();
        this.waveIteration((wave: Wave) => wave.createEvents());
    }

    updateStates(timestamp: number) {
        this.waveIteration((wave: Wave) => wave.updateStates(timestamp));
    }

    /** Boucle le tableau des vagues de monstres actuellement sur la carte */
    waveIteration(fn: (wave: Wave) => void) {
        this._currentWaves.forEach(fn);
    }

    // TODO Delete later
    // Juste pour les tests (pour avoir un truc à afficher avec console.log)
    waveIteration2(fn: (wave: Wave) => void) {
        return this._currentWaves.map(fn);
    }
}
