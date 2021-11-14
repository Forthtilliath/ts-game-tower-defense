import Interface from './Interface.js';
import Json from './Json.js';
/**
 * La class Game est la colonne vertébrale du jeu. Celle ci récupère les données
 * contenues dans le json et les propages dans toute l'application.
 *
 * Game fait la liaison entre la Map, l'Interface et le Json.
 */
export default class Game {
    /** Carte à laquelle le joueur joue */
    private _currentMap?;
    /** Données du json */
    private _json?;
    /** Jeu en mode play ou non */
    private _isPlaying;
    /** Timer de la partie. Un timestamp de 1 correspond à 1/60 seconde. */
    private _timestamp;
    /** Id de l'animation pour être capable de la supprimer par la suite */
    private _animFrameId;
    /** Infos du joueur */
    private _interface;
    /** Timer à laquelle la prochaine vague commence */
    private _timestampNextWave;
    /** Delai entre deux vagues */
    private _delaiBetweenWaves;
    private constructor();
    get isPlaying(): boolean;
    get interface(): Interface;
    get json(): Json;
    get timestamp(): number;
    get delaiBetweenWaves(): number;
    setTimestampNextWave(): number;
    /** Instancie une Game et charge le json */
    static CreateAsync: () => Promise<Game>;
    /** Charge la carte choisit par le joueur */
    loadMap(mapId: number): void;
    /** Met à jour le contenu de l'interface */
    private updateInterface;
    /**
     * Modifie l'état du jeu entre en jeu ou non. Si aucun nouvel état est passé en
     * paramètre, l'état de jeu est basculé.
     */
    setPlaying(newState?: boolean): void;
    private play;
    private stop;
    private update;
}
export declare const GameInitialized: Promise<Game>;
