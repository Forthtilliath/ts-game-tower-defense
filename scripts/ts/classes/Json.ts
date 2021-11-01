export default class Json {
    private _data?: TJson;
    private _map?: TJsonMap;
    private _wave?: TJsonWave;
    private _tiles?: number[];
    private _routes?: number[][];

    private constructor() {}

    public static async Load(url: string) {
        const json = new Json();
        try {
            json._data = await fetch(url).then((res) => res.json());
        } catch (err) {
            console.error(err);
        }
        return json;
    }

    public get data() {
        return this._data;
    }

    public get player()  {
        return this._data?.player;
    }

    public set map(i: number) {
        this._map = this._data?.map[i];
        this._tiles = this._map?.tiles.flatMap((x) => x);
        this._routes = this._map?.routes;
    }

    public getMap(i?: number) {
        // Si un index de map a été passé en param, on renvoit la map demandée
        if (typeof i === 'number') return this._data?.map[i];

        // Renvoit la map en cours
        return this._map;
    }

    public get turrets() {
        return this._data?.turrets;
    }

    public get monsters() {
        return this._data?.monsters;
    }

    public set wave(i: number) {
        this._wave = this._data?.waves[i];
    }

    public getWave(i?: number) {
        // Si un index de map a été passé en param, on renvoit la map demandée
        if (typeof i === 'number') return this._data?.waves[i];

        // Renvoit la map en cours
        return this._wave;
    }

    public get tiles() {
        return this._tiles;
    }
}

export const JsonLoaded = Json.Load('../json/datas.json');
