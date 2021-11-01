export default class Tile {
    private _index;
    private _type;
    private _element;
    private _map;
    constructor({ type, index, map }: TTile);
    get element(): HTMLDivElement;
    createElement(): HTMLDivElement;
    createEvents(): void;
    createEventConstructible(): void;
    createEventTower(): void;
    removeEvents(): void;
    addClasses(): void;
    removeClasses(): void;
    getContent(): number;
    getPlayerGold(): number;
    setPlayerGold(transaction: number): void;
}
