export default class Game {
    private _currentMap;
    private _datas;
    private _isPlaying;
    private _timestamp;
    private _animFrameId;
    private constructor();
    get isPlaying(): boolean;
    setPlaying(newState?: boolean): void;
    static CreateAsync: () => Promise<Game>;
    loadMap(mapId: number): void;
    private play;
    private stop;
    private updateStates;
    private update;
}
export declare const GameInitialized: Promise<Game>;
