interface ObjectType {
    readonly [key: number]: string;
}

type XY = {
    x: number;
    y: number;
};

type TMap = {
    tiles: number[];
    nbTiles: XY;
    waves: object[];
    readonly jsonMonsters: TJsonMonster[];
    readonly jsonMapRoutes: number[][];
    game: Game;
};

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
};

type TWave = {
    id: number;
    monsters: Monster[];
    gold: number;
    difficulty: number;
    readonly jsonMonsters: object[];
    map: Map;
    waveNumber: number;
};

type TWaveMonster = {
    idMonster: number;
    quantity: number;
};

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

type TJsonWave = {
    id: number;
    monsters: { idMonster: number; quantity: number }[];
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
