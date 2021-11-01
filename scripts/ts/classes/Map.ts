import utils from '../utils.js';
import Tile from './Tile.js';
import Wave from './Wave.js';
import C from '../constants.js';

/**
 * La classe Map gère tout ce qui est en rapport avec la map.
 *
 * + generateDom() : Génère le DOM en fonction du tableau des cases
 * + getRoutes() : Retourne les routes de la map
 * + createEvents() : Génère les évènements de la map
 */
export default class Map {
    public game: any;
    /** Element dans le DOM */
    private element: HTMLDivElement;
    /** Nombre de cases en X et Y */
    private nbTiles: { x: number; y: number };
    /** Tableau contenant toutes les cases */
    public arrTiles: any[];
    /** Tableau des routes de la map (valeurs brut du json) */
    private jsonMapRoutes: number[][];
    /** Tableau des monstres (valeurs brut du json) */
    private jsonMonsters: TJsonMonster[];
    /** Vague courante, démarre à -1 */
    private currentWaveIndex: number;
    /** Tableau contenant l'ensemble des vagues de la map */
    private waves: object[];
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
    public currentWaves: Wave[];
    /** Contient l'état du jeu */
    public finished: boolean;

    constructor({ element, tiles, nbTiles, waves, jsonMonsters, jsonMapRoutes, game }: TMap) {
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

    /** Génère une nouvelle vague à partir de l'index de la vague courante */
    generateWave(): Wave {
        C.LOG_WAVE && console.log('Génération de la vague', this.currentWaveIndex);
        // NOTE modifier map par routes ?
        return new Wave({
            ...this.waves[this.currentWaveIndex],
            jsonMonsters: this.jsonMonsters,
            map: this,
            waveNumber: this.currentWaveIndex,
        } as TWave);
    }

    /** Passe à la vague suivante */
    nextWave() {
        if (this.finished) return;

        if (this.currentWaveIndex < this.waves.length - 1) {
            this.currentWaveIndex++;
            this.currentWaves.push(this.generateWave());
            this.createEvents();
        } else {
            this.finished = true;
        }
    }

    /** Génère le DOM en fonction du tableau des cases */
    generateDom() {
        // Modifie les variables CSS pour adapter le grid en fonction du nombre de cases en X et Y
        this.element.style.setProperty('--nbColumns', this.nbTiles.x.toString());
        this.element.style.setProperty('--nbRows', this.nbTiles.y.toString());
        this.element.style.setProperty('--tile-size', C.TILE_DEFAULT_SIZE);

        // Ajoute les cases dans la map
        utils.appendChilds(
            this.element,
            this.arrTiles.map((tile) => tile.element),
        );
    }

    /** Retourne les routes de la map */
    getRoutes() {
        return this.jsonMapRoutes;
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
        this.currentWaves.forEach(fn);
    }

    // TODO Delete later
    // Juste pour les tests (pour avoir un truc à afficher avec console.log)
    waveIteration2(fn: (wave: Wave) => void) {
        return this.currentWaves.map(fn);
    }
}
