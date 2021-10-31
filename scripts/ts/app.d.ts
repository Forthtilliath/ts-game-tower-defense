// interface Object {
//     [key: string]: any;
// }
interface ObjectType {
    readonly [key: number]: string;
}

type IMap = {
    element: HTMLDivElement;
    tiles: number[];
    nbTiles: { x: number; y: number };
    waves: object[];
    jsonMonsters: object[];
    jsonMapRoutes: number[][];
    game: Game;
};

type ITile = {
    type: number;
    index: number;
};

type IMonster = {
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
    jsonMonsters: object[];
    map: Map;
    waveNumber: number;
};

type TWaveMonster = {
    idMonster: number;
    quantity: number;
};
