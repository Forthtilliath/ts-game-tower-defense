import utils, { $ } from '../utils.js';
import C from '../constants.js';
import Game from './Game.js';
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
    /** Element dans le DOM */
    private _element: HTMLDivElement = $('#map') as HTMLDivElement;
    /** Istance de Jeu */
    private _game: Game;
    /** Nombre de cases en X et Y */
    private _tilesXY: XY;
    /** Vague courante, démarre à -1 */
    private _currentWaveIndex: number;
    /** Tableau contenant l'ensemble des id des vagues de la map */
    private _wavesId: number[];
    /**
     * Tableau contenant l'ensemble des vagues de la map
     *
     * Si la map contient les vagues avec les id 0 et 2, le tableau aura une vague à
     * l'index 0 et 2.
     *
     * L'index 1 restera vide.
     */
    private _waves: TJsonWave[] = [];
    /** Contient l'état de la carte */
    // private _finished: boolean;
    /** Tableau contenant toutes les cases */
    private _tiles: Tile[];
    /************************************
     * Tableau contenant l'ensemble des vagues présentes sur la map
     *
     * A chaque nouvelle vague, celle-ci est ajoutée dans ce tableau. Dès le dernier
     * monstre de la vague sortie de la map, la vague est supprimée du tableau.
     */
    private _currentWaves: Wave[];

    public constructor(game: Game) {
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

    public get game() {
        return this._game;
    }

    // public get finished() {
    //     return this._finished;
    // }

    public get waves() {
        return this._waves;
    }

    public get currentWaves() {
        return this._currentWaves;
    }

    public set currentWaves(waves: Wave[]) {
        this._currentWaves = waves;
    }

    public get currentWaveIndex() {
        return this._currentWaveIndex;
    }

    public get tiles() {
        return this._tiles;
    }

    public getWaveId(index: number = this._currentWaveIndex) {
        return this._wavesId[index];
    }

    public getWave(waveId: number = this.getWaveId()): TJsonWave {
        return this._waves[waveId];
    }

    //=======================
    // METHODES
    //=======================

    /** Transforme le tableau des types cases de la map en un tableau de Tile */
    private generateTiles() {
        if (!this._game.json) return [];

        const mergedArray = this._game.json.tiles.flatMap((x: any) => x);
        const tilesArray = mergedArray.map((type, index) => new Tile({ type, index, map: this }));
        return tilesArray;
    }

    /** Génère le DOM en fonction du tableau des cases */
    private generateDom() {
        // Modifie les variables CSS pour adapter le grid en fonction du nombre de cases en X et Y
        this._element.style.setProperty('--nbColumns', this._tilesXY.x.toString());
        this._element.style.setProperty('--nbRows', this._tilesXY.y.toString());
        this._element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);

        // Ajoute les cases dans la map
        utils.appendChilds(
            this._element,
            this._tiles.map((tile) => tile.element),
        );

        return this;
    }

    /** Ajoute les données json d'une vague à partir de l'id de la vague. */
    private addWaves(...wavesId: number[]) {
        [...new Set(wavesId)].forEach((id) => (this._waves[id] = utils.getContentById(id, this.game.json.data.waves)));
    }

    /** Passe à la vague suivante */
    public nextWave() {
        this._currentWaveIndex++;
        this._currentWaves.push(this.createWave());
    }

    /** Génère une nouvelle vague à partir de l'index de la vague courante */
    private createWave(): Wave {
        C.LOG_WAVE && console.log('Génération de la vague', this._currentWaveIndex);
        return new Wave(this);
    }

    /** Supprime la vague du tableau des vagues en cours */
    private removeWave(waveToDelete: Wave) {
        this._currentWaves = this._currentWaves.filter((wave) => wave !== waveToDelete);
    }

    /** Boucle le tableau des vagues de monstres actuellement sur la carte */
    private waveIteration(fn: (wave: Wave) => void) {
        this._currentWaves.forEach(fn);
    }

    /** Vérifie si la vague en cours est la dernière vague de la map */
    private isLastWave() {
        return this._waves.length === this._currentWaveIndex + 1;
    }

    /** Actions lorsqu'une vague est terminée */
    public waveFinished(wave: Wave) {
        this.removeWave(wave);

        if (this.isLastWave()) {
            this.game.setPlaying(false);
        } else {
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
    public updateStates(timestamp: number) {
        this.waveIteration((wave: Wave) => wave.updateStates(timestamp));
    }
}
