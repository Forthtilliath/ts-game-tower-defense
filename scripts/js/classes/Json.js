export default class Json {
    constructor() { }
    static async Load(url) {
        const json = new Json();
        try {
            json._data = await fetch(url).then((res) => res.json());
        }
        catch (err) {
            console.error(err);
        }
        return json;
    }
    get data() {
        return this._data;
    }
    get player() {
        return this._data?.player;
    }
    set map(i) {
        this._map = this._data?.map[i];
        this._tiles = this._map?.tiles.flatMap((x) => x);
        this._routes = this._map?.routes;
    }
    getMap(i) {
        if (typeof i === 'number')
            return this._data?.map[i];
        return this._map;
    }
    get turrets() {
        return this._data?.turrets;
    }
    get monsters() {
        return this._data?.monsters;
    }
    set wave(i) {
        this._wave = this._data?.waves[i];
    }
    getWave(i) {
        if (typeof i === 'number')
            return this._data?.waves[i];
        return this._wave;
    }
    get tiles() {
        return this._tiles;
    }
}
export const JsonLoaded = Json.Load('../json/datas.json');
