import { EmptyObject } from '../constants.js';
import utils, { $ } from '../utils.js';
import Interface from './Interface.js';
import Json from './Json.js';
import Map from './Map.js';
// import Player from './Player.js';

export default class Game {
    /** Carte à laquelle le joueur joue */
    private _currentMap?: Map;
    /** Données du json */
    private _datas?: TJson; // TODO A supprimer plus tard
    private _json?: Json;
    /** Jeu en mode play ou non */
    private _isPlaying: boolean;
    /** Timer de la partie. Un timestamp de 1 correspond à 1 seconde. */
    private _timestamp: number;
    /** Id de l'animation pour être capable de la supprimer par la suite */
    private _animFrameId: number;
    /** Infos du joueur */
    // private _player?: Player;
    private _interface: Interface;

    private constructor() {
        this._isPlaying = false;
        this._timestamp = 0;
        this._animFrameId = 0;
        this._interface = new Interface();

        return this;
    }

    // GETTERS ET SETTERS

    public get isPlaying() {
        return this._isPlaying;
    }

    public get interface() {
        return this._interface;
    }

    public get json() {
        return this._json;
    }

    /** Met à jour le contenu de l'interface */
    public updateInterface() {
        return this._interface.set(this._json?.player, this._json?.nbWaves);
    }

    /**
     * Modifie l'état du jeu entre en jeu ou non. Si aucun nouvel état est passé en
     * paramètre, l'état de jeu est basculé.
     */
    public setPlaying(newState: boolean = !this._isPlaying) {
        this._isPlaying = newState;
        this._isPlaying ? this.play() : this.stop();
    }

    // METHODES

    /** Instancie une Game et charge le json */
    public static CreateAsync = async () => {
        const theGame = new Game();
        /** Toute les données contenues dans le json */
        theGame._json = await Json.Load('../json/datas.json');
        theGame._datas = theGame._json.data; // TODO A supprimer
        return theGame;
    };

    /** Charge la carte choisit par le joueur */
    public loadMap(mapId: number) {
        if (!this._json) return;

        this._json.setMap(mapId);

        // Instancie la carte à partir des données du json
        this._currentMap = new Map(this);
        // this._currentMap = new Map({
        //     tiles: this._datas.maps[mapId].tiles.flatMap((x: any) => x), //json
        //     nbTiles: this._datas.maps[mapId].nbTiles, //json
        //     waves: utils.getContentByIds(this._datas.maps[mapId].waves, this._datas.waves), //json
        //     jsonMonsters: this._datas.monsters, //json
        //     jsonMapRoutes: this._datas.maps[mapId].routes, //json
        //     game: this,
        // });

        this._currentMap.generateDom();
    }

    // ANIMATION

    private play() {
        if (!this._currentMap) return;

        this._currentMap.nextWave();
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

export const GameInitialized = Game.CreateAsync();
