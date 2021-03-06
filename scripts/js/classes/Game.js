var _a;
import { LogStyles } from '../constants.js';
import C from '../constants.js';
import Interface from './Interface.js';
import Json from './Json.js';
import Map from './Map.js';
/**
 * La class Game est la colonne vertébrale du jeu. Celle ci récupère les données
 * contenues dans le json et les propages dans toute l'application.
 *
 * Game fait la liaison entre la Map, l'Interface et le Json.
 */
export default class Game {
    constructor() {
        this._isPlaying = false;
        this._timestamp = 0;
        this._animFrameId = 0;
        this._interface = new Interface(this);
        this._timestampNextWave = 0;
        this._delaiBetweenWaves = C.WAVE_DELAI * 60;
        console.log(typeof this, this);
        return this;
    }
    //=======================
    // GETTERS ET SETTERS
    //=======================
    get isPlaying() {
        return this._isPlaying;
    }
    get interface() {
        return this._interface;
    }
    get map() {
        return this._currentMap;
    }
    get json() {
        return this._json;
    }
    get timestamp() {
        return this._timestamp;
    }
    get delaiBetweenWaves() {
        return this._delaiBetweenWaves;
    }
    setTimestampNextWave() {
        return this._timestampNextWave = this._timestamp + this._delaiBetweenWaves;
    }
    /** Charge la carte choisit par le joueur */
    loadMap(mapId) {
        if (!this._json)
            return;
        this._json.setMap(mapId);
        // Instancie la carte à partir des données du json
        this._currentMap = new Map(this);
        // Met à jour l'interface à partir des données du json
        this.updateInterface();
    }
    /** Met à jour le contenu de l'interface */
    updateInterface() {
        return this._interface.set(this.json.player, this.json.nbWaves);
    }
    /**
     * Modifie l'état du jeu entre en jeu ou non. Si aucun nouvel état est passé en
     * paramètre, l'état de jeu est basculé.
     */
    setPlaying(newState = !this._isPlaying) {
        this._isPlaying = newState;
        this._isPlaying ? this.play() : this.stop();
    }
    //=======================
    // ANIMATION
    //=======================
    play() {
        this.update();
    }
    stop() {
        cancelAnimationFrame(this._animFrameId);
    }
    update() {
        if (!this._currentMap) {
            console.error(`%cErreur, pas de carte chargée !`, LogStyles.danger);
            return;
        }
        this._animFrameId = requestAnimationFrame(() => this.update());
        // Si le timestap correspond à celui de la vague suivante, on débute la vague
        // Par défaut, on commence à 0, donc la première vague se lance dès le début
        if (this._timestamp === this._timestampNextWave) {
            this._currentMap.nextWave();
        }
        // Incrémente le timestamp afin de pouvoir manipuler plus facilement les vitesses de
        // déplacement des éléments
        this._timestamp += 1;
        this._currentMap.updateStates(this._timestamp);
    }
}
_a = Game;
//=======================
// METHODES
//=======================
/** Instancie une Game et charge le json */
Game.CreateAsync = async () => {
    const theGame = new Game();
    /** Toutes les données contenues dans le json */
    theGame._json = await Json.Load('../json/datas.json');
    return theGame;
};
export const GameInitialized = Game.CreateAsync();
