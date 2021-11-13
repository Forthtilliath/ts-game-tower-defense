export default class Json {
    private _data?;
    private _map?;
    private _wave?;
    private _tilesXY;
    private _tiles;
    private _routes;
    private _waves;
    private _mapIndex;
    private _waveIndex;
    private constructor();
    static Load(url: string): Promise<Json>;
    get data(): TJson;
    get player(): TJsonPlayer;
    private nbTiles;
    setMap(i: number): void;
    getMap(i?: number): TJsonMap;
    get turrets(): TJsonTurret[];
    get monsters(): TJsonMonster[];
    setWave(i: number): void;
    getWave(i?: number): TJsonWave;
    get tiles(): number[];
    get routes(): number[][];
    get nbWaves(): number;
}
export declare const JsonLoaded: Promise<Json>;
