import { LogStyles } from './../constants.js';
export default class Json {
    private _data?: TJson;
    private _map?: TJsonMap;
    private _wave?: TJsonWave;
    private _tiles: number[];
    private _routes: number[][];

    private constructor() {
        this._tiles = [];
        this._routes = [];
    }

    public static async Load(url: string) {
        const json = new Json();
        try {
            json._data = await fetch(url).then((res) => res.json());
            json.setMap(0);
        } catch (err) {
            console.error(`%cErreur lors du chargement du fichier json`, LogStyles.error);
        }
        return json;
    }

    public get data(): TJson {
        return this._data!;
    }

    public get player(): TJsonPlayer {
        return this.data.player;
    }

    /** Met à jour la map pour récupérer plus facilement les cases et les routes */
    public setMap(i: number) {
        this._map = this.data.maps[i];
        if (this._map) {
            this._tiles = this._map.tiles.flatMap((x) => x);
            this._routes = this._map.routes;
        } else {
            console.error(`%cL'index ${i} n'existe pas sur le tableau des maps !`, LogStyles.error);
        }
    }

    public getMap(i?: number): TJsonMap {
        // Si un index de map a été passé en param, on renvoit la map demandée
        if (typeof i === 'number') return this.data.maps[i];

        // Renvoit la map en cours
        return this._map!;
    }

    public get turrets(): TJsonTurret[] {
        return this.data.turrets;
    }

    public get monsters(): TJsonMonster[] {
        return this.data.monsters;
    }

    public setWave(i: number) {
        // this._wave = this._data?.waves?.[i];
        this._wave = this.data.waves[i];
    }

    public getWave(i?: number) {
        // Si un index de vague a été passé en param, on renvoit la vague demandée
        if (typeof i === 'number') return this.data.waves[i];

        // Renvoit la vague en cours
        return this._wave;
    }

    public get tiles() {
        return this._tiles;
    }

    public get routes() {
        return this._routes;
    }

    public get nbWaves() {
        return this._map?.waves.length ?? -1;
    }
}

export const JsonLoaded = Json.Load('../json/datas.json');
