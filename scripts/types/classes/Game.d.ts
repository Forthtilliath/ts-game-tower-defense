import Interface from './Interface.js';
import Json from './Json.js';
export default class Game {
    private _currentMap?;
    private _datas?;
    private _json?;
    private _isPlaying;
    private _timestamp;
    private _animFrameId;
    private _interface;
    private constructor();
    get isPlaying(): boolean;
    get interface(): Interface;
    get json(): Json | undefined;
    updateInterface(): void;
    setPlaying(newState?: boolean): void;
    static CreateAsync: () => Promise<Game>;
    loadMap(mapId: number): void;
    private play;
    private stop;
    private updateStates;
    private update;
}
export declare const GameInitialized: Promise<Game>;
