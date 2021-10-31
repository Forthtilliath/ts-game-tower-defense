import utils, { $ } from '../utils.js';
import Map from './Map.js';

export default class Game {
    /** Carte à laquelle le joueur joue */
    private _currentMap: Map | undefined;
    private _datas: any;
    /** Jeu en mode play ou non */
    private _isPlaying: boolean;
    /** Timer de la partie. Un timestamp de 1 correspond à 1 seconde. */
    private _timestamp: number;
    /** Id de l'animation pour être capable de la supprimer par la suite */
    private _animFrameId: number;

    private constructor() {
        this._currentMap = undefined;
        this._isPlaying = false;
        this._timestamp = 0;
        this._animFrameId = 0;

        return this;
    }

    // GETTERS ET SETTERS

    public get isPlaying() {
        return this._isPlaying;
    }

    /**
     * Modifie l'état du jeu entre en jeu ou non. Si aucun nouvel état est passé en
     * paramètre, l'état de jeu est basculé.
     */
    public setPlaying(newState: boolean = !this._isPlaying) {
        this._isPlaying = newState;
        this._isPlaying ? this.play() : this.stop();
    }

    /** Instancie une Game et charge le json */
    public static CreateAsync = async () => {
        const theGame = new Game();
        /** Toute les données contenues dans le json */
        theGame._datas = await utils.loadJson('../json/datas.json');
        return theGame;
    };

    /**
     * Charge la carte choisit par le joueur
     */
    public loadMap(mapId: number) {
        /** Instancie la carte à partir des données du json */
        this._currentMap = new Map({
            element: $('#map') as HTMLDivElement,
            tiles: utils.mergeArrays(this._datas.map[mapId].tiles),
            nbTiles: this._datas.map[mapId].nbTiles,
            waves: utils.getContentByIds(this._datas.map[mapId].waves, this._datas.waves),
            jsonMonsters: this._datas.monsters,
            jsonMapRoutes: this._datas.map[mapId].routes,
            game: this,
        });

        this._currentMap.generateDom();
    }

    private play() {
        this._currentMap!.nextWave();
        this.update();
    }

    private stop() {
        cancelAnimationFrame(this._animFrameId);
    }

    private updateStates() {
        this._currentMap!.updateStates(this._timestamp);
    }

    private update() {
        this._animFrameId = requestAnimationFrame(() => this.update());

        // Incrémente le timestamp afin de pouvoir manipuler plus facilement les vitesses de
        // déplacement des éléments
        this._timestamp += 1;

        this.updateStates();
    }
}

export const GameInitialized =  Game.CreateAsync();
