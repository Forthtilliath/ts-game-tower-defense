type ObjectType = {
    readonly [key: number]: string;
};

type XY = {
    x: number;
    y: number;
};

type Positive<T extends number> = `${T}` extends `-${number}` ? never : T extends 0 ? never : T;
type Integer<T extends number> = `${T}` extends `${number}.${number}` ? never : T;
type Zero<T extends number> = T extends 0 ? T : never;
type PositiveInteger<T extends number> = Positive<T> & Integer<T>;
type PositiveIntegerZero<T extends number> = (Positive<T> & Integer<T>) | Zero<T>;

// classes

class Interface {
    private _playerGoldElement;
    private _playerLifeElement;
    private _waveNumberElement;
    private _playerGold;
    private _playerLife;
    private _waveNumber;
    private _waveMax;
    constructor(player?: TJsonPlayer, waveMax?: number);
    get playerGold(): number;
    private get wave();
    set(player?: TJsonPlayer, waveMax?: number): void;
    private setDisplay;
    setGold(gold: number): void;
    setLife(life: number): void;
    setWave(wave: number): void;
    private anim;
}
class Json {
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
const JsonLoaded: Promise<Json>;
class Game {
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
const GameInitialized: Promise<Game>;
class Map {
    private _element;
    private _game;
    private _tilesXY;
    private _currentWaveIndex;
    private _wavesId;
    private _waves;
    private _tiles;
    private _currentWaves;
    constructor(game: Game);
    get game(): Game;
    get waves(): TJsonWave[];
    get currentWaves(): Wave[];
    set currentWaves(waves: Wave[]);
    get currentWaveIndex(): number;
    get tiles(): Tile[];
    getWaveId(index?: number): number;
    getWave(waveId?: number): TJsonWave;
    private generateTiles;
    private generateDom;
    private addWaves;
    nextWave(): void;
    private createWave;
    private removeWave;
    private waveIteration;
    private isLastWave;
    waveFinished(wave: Wave): void;
    updateStates(timestamp: number): void;
}
class Wave {
    private _map;
    private _waveNumber;
    private _id?;
    private _monsters?;
    private _difficulty?;
    private _gold?;
    private _monstersToPop;
    private _monstersInMap;
    private _createdAt;
    private _finished;
    constructor(map: Map);
    get map(): Map;
    get waveNumber(): number;
    get monstersInMap(): Monster[];
    get monstersToPop(): Monster[];
    isFinished(): boolean;
    private generateMonstersToPop;
    private popMonster;
    removeMonsterOfMap(element: HTMLElement): void;
    monstersRemaining(): number;
    updateStates(timestamp: number): void;
}
class Monster {
    private _element;
    private _id;
    private _name;
    private _life;
    private _movement;
    private _flying;
    private _gold;
    private _damages;
    private _type;
    private _route;
    private _wave;
    private _container;
    private _target;
    constructor({ id, name, life, movement, damages, flying, gold, type, wave, routeIndex }: TMonster & {
        wave: Wave;
    });
    get element(): HTMLElement;
    private createElement;
    initialPosition(): void;
    private move;
    private isTargetReached;
    updateStates(timestamp: number): void;
}
class Tile {
    private _map;
    private _index;
    private _type;
    private _element;
    constructor({ type, index, map }: TTile);
    get element(): HTMLDivElement;
    private getContent;
    private getPlayerGold;
    private setPlayerGold;
    private createElement;
    private createEvents;
    private createEventConstructible;
    private createEventTower;
    private removeEvents;
    private addClasses;
    private removeClasses;
    private resetElement;
    private setElement;
}

// Params constructors des classes

type TTile = {
    type: number;
    index: number;
    map: Map;
};

type TMonster = {
    id: number;
    name: string;
    life: number;
    movement: number;
    flying: boolean;
    gold: number;
    damages: number;
    type: number;
    wave: Wave;
    routeIndex: number;
    /**
     * Ajouté en brut dans le construction car j'avais un globalthis.Wave dont je n'ai pas
     * réussi à outrepasser
     */ 
    // wave: Wave;
};

// Json
type TJsonPlayer = {
    startGold: number;
    startLife: number;
};

type TJsonMap = {
    nbTiles: XY;
    tiles: number[][];
    waves: number[];
    routes: number[][];
};

type TJsonTurret = {
    id: number;
    name: string;
    cost: number;
    speed: number;
    damages: number;
};

type TJsonMonster = {
    id: number;
    name: string;
    movement: string;
    life: number;
    gold: number;
    damages: number;
    flying: boolean;
    type: number;
};

type TJsonWaveMonster = {
    idMonster: number;
    quantity: number;
};

type TJsonWave = {
    id: number;
    monsters: TJsonWaveMonster[];
    difficulty: number;
    gold: number;
};

type TJson = {
    player: TJsonPlayer;
    maps: TJsonMap[];
    turrets: TJsonTurret[];
    monsters: TJsonMonster[];
    waves: TJsonWave[];
};
