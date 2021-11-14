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
    private _element;
    /** Istance de Jeu */
    private _game;
    /** Nombre de cases en X et Y */
    private _tilesXY;
    /** Vague courante, démarre à -1 */
    private _currentWaveIndex;
    /** Tableau contenant l'ensemble des id des vagues de la map */
    private _wavesId;
    /**
     * Tableau contenant l'ensemble des vagues de la map
     *
     * Si la map contient les vagues avec les id 0 et 2, le tableau aura une vague à
     * l'index 0 et 2.
     *
     * L'index 1 restera vide.
     */
    private _waves;
    /** Contient l'état de la carte */
    /** Tableau contenant toutes les cases */
    private _tiles;
    /************************************
     * Tableau contenant l'ensemble des vagues présentes sur la map
     *
     * A chaque nouvelle vague, celle-ci est ajoutée dans ce tableau. Dès le dernier
     * monstre de la vague sortie de la map, la vague est supprimée du tableau.
     */
    private _currentWaves;
    constructor(game: Game);
    get game(): Game;
    get waves(): TJsonWave[];
    get currentWaves(): Wave[];
    set currentWaves(waves: Wave[]);
    get currentWaveIndex(): number;
    get tiles(): Tile[];
    getWaveId(index?: number): number;
    getWave(waveId?: number): TJsonWave;
    /** Transforme le tableau des types cases de la map en un tableau de Tile */
    private generateTiles;
    /** Génère le DOM en fonction du tableau des cases */
    private generateDom;
    /** Ajoute les données json d'une vague à partir de l'id de la vague. */
    private addWaves;
    /** Passe à la vague suivante */
    nextWave(): void;
    /** Génère une nouvelle vague à partir de l'index de la vague courante */
    private createWave;
    /** Supprime la vague du tableau des vagues en cours */
    private removeWave;
    /** Boucle le tableau des vagues de monstres actuellement sur la carte */
    private waveIteration;
    /** Vérifie si la vague en cours est la dernière vague de la map */
    private isLastWave;
    /** Actions lorsqu'une vague est terminée */
    waveFinished(wave: Wave): void;
    /**
     * Met à jour chaque vague, car même si le joueur est à la vague 2, il peut rester
     * des monstres des vagues précédentes à faire avancer.
     */
    updateStates(timestamp: number): void;
}
