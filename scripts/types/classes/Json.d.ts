export default class Json {
    private _data?;
    private _map?;
    private _wave?;
    private _tiles?;
    private _routes?;
    private constructor();
    static Load(url: string): Promise<Json>;
    get data(): TJson | undefined;
    get player(): TJsonPlayer | undefined;
    setMap(i: number): void;
    getMap(i?: number): TJsonMap | undefined;
    get turrets(): TJsonTurret[] | undefined;
    get monsters(): TJsonMonster[] | undefined;
    set wave(i: number);
    getWave(i?: number): TJsonWave | undefined;
    get tiles(): number[] | undefined;
    get routes(): number[][] | undefined;
    get nbWaves(): number | undefined;
}
export declare const JsonLoaded: Promise<Json>;
