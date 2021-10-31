export default class Tile {
    private index;
    private type;
    private element;
    constructor({ type, index }: ITile);
    createElement(): HTMLDivElement;
    createEvents(): void;
    createEventConstructible(): void;
    createEventTower(): void;
    removeEvents(): void;
    addClasses(): void;
    removeClasses(): void;
    getContent(): number;
}
