import Interface from './Interface.js';
import Json from './Json.js';
export default class Game {
    private _currentMap?;
    private _json?;
    private _isPlaying;
    private _timestamp;
    private _animFrameId;
    private _interface;
    private _timestampNextWave;
    private _delaiBetweenWaves;
    private constructor();
    get isPlaying(): boolean;
    get interface(): Interface;
    get json(): Json;
    get timestamp(): number;
    get delaiBetweenWaves(): number;
    setTimestampNextWave(): number;
    static CreateAsync: () => Promise<Game>;
    loadMap(mapId: number): void;
    private updateInterface;
    setPlaying(newState?: boolean): void;
    private play;
    private stop;
    private update;
}
export declare const GameInitialized: Promise<Game>;
