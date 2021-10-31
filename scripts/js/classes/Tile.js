const TYPE_DECOR = 0;
const TYPE_START = 1;
const TYPE_ROUTE = 2;
const TYPE_END = 3;
const TYPE_CONSTRUCTIBLE = 4;
const TYPE_TURRET = 5;
const arrTypeClasses = {
    [TYPE_DECOR]: 'decor',
    [TYPE_START]: 'start',
    [TYPE_ROUTE]: 'route',
    [TYPE_END]: 'end',
    [TYPE_CONSTRUCTIBLE]: 'constructible',
    [TYPE_TURRET]: 'turret',
};
export default class Tile {
    constructor({ type, index }) {
        this.index = index;
        this.type = type;
        this.element = this.createElement();
        this.addClasses();
        this.createEvents();
    }
    createElement() {
        const div = document.createElement('div');
        div.classList.add('tile');
        div.textContent = this.getContent().toString();
        return div;
    }
    createEvents() {
        switch (this.type) {
            case TYPE_DECOR:
                break;
            case TYPE_START:
                break;
            case TYPE_ROUTE:
                break;
            case TYPE_END:
                break;
            case TYPE_CONSTRUCTIBLE:
                this.element.addEventListener('click', () => this.createEventConstructible());
                break;
            case TYPE_TURRET:
                this.element.addEventListener('click', () => this.createEventTower());
                break;
        }
    }
    createEventConstructible() {
        console.log('constructible', this.element);
        this.removeEvents();
        this.removeClasses();
        this.type = TYPE_TURRET;
        this.element.textContent = this.getContent().toString();
        this.createEvents();
        this.addClasses();
    }
    createEventTower() {
        console.log('tourelle', this.element);
    }
    removeEvents() {
        this.element.replaceWith((this.element = this.element.cloneNode(true)));
    }
    addClasses() {
        this.element.classList.add(arrTypeClasses[this.type]);
    }
    removeClasses() {
        this.element.classList.remove(arrTypeClasses[this.type]);
    }
    getContent() {
        return this.index;
    }
}
