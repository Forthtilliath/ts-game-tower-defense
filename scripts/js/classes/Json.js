import { LogStyles } from './../constants.js';
export default class Json {
    constructor() {
        this._tiles = [];
        this._routes = [];
    }
    static async Load(url) {
        const json = new Json();
        try {
            json._data = await fetch(url).then((res) => res.json());
            json.setMap(0);
        }
        catch (err) {
            console.error(`%cErreur lors du chargement du fichier json`, LogStyles.error);
        }
        return json;
    }
    get data() {
        return this._data;
    }
    get player() {
        return this.data.player;
    }
    setMap(i) {
        this._map = this.data.maps[i];
        if (this._map) {
            this._tiles = this._map.tiles.flatMap((x) => x);
            this._routes = this._map.routes;
        }
        else {
            console.error(`%cL'index ${i} n'existe pas sur le tableau des maps !`, LogStyles.error);
        }
    }
    getMap(i) {
        if (typeof i === 'number')
            return this.data.maps[i];
        return this._map;
    }
    get turrets() {
        return this.data.turrets;
    }
    get monsters() {
        return this.data.monsters;
    }
    setWave(i) {
        this._wave = this.data.waves[i];
        if (this._wave) {
        }
        else {
            console.error(`%cL'index ${i} n'existe pas sur le tableau des waves !`, LogStyles.error);
        }
    }
    getWave(i) {
        if (typeof i === 'number')
            return this.data.waves[i];
        return this._wave;
    }
    get tiles() {
        return this._tiles;
    }
    get routes() {
        return this._routes;
    }
    get nbWaves() {
        return this._map?.waves.length ?? -1;
    }
}
export const JsonLoaded = Json.Load('../json/datas.json');
