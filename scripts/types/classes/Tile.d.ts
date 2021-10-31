export default class Tile {
    private index;
    private type;
    private element;
    constructor({ type, index }: TTile);
    createElement(): HTMLDivElement;
    createEvents(): void;
    createEventConstructible(): void;
    createEventTower(): void;
    removeEvents(): void;
    addClasses(): void;
    removeClasses(): void;
    getContent(): number;
}
