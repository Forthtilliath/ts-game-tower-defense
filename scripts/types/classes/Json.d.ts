export default class Json {
    private _data;
    private _map;
    private _wave?;
    private _tiles;
    private _routes;
    private constructor();
    static Load(url: string): Promise<Json>;
    get data(): TJson;
    get player(): TJsonPlayer;
    setMap(i: number): void;
    getMap(i?: number): TJsonMap;
    get turrets(): TJsonTurret[];
    get monsters(): TJsonMonster[];
    set wave(i: number);
    getWave(i?: number): TJsonWave | undefined;
    get tiles(): number[];
    get routes(): number[][];
    get nbWaves(): number;
}
export declare const JsonLoaded: Promise<Json>;
