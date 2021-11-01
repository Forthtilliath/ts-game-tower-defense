import C from '../constants.js';
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
    constructor({ type, index, map }) {
        this._index = index;
        this._type = type;
        this._map = map;
        this._element = this.createElement();
        this.addClasses();
        this.createEvents();
    }
    get element() {
        return this._element;
    }
    createElement() {
        const div = document.createElement('div');
        div.classList.add('tile');
        C.TEXTCONTENT_TILE && (div.textContent = this.getContent().toString());
        return div;
    }
    createEvents() {
        switch (this._type) {
            case TYPE_DECOR:
                break;
            case TYPE_START:
                break;
            case TYPE_ROUTE:
                break;
            case TYPE_END:
                break;
            case TYPE_CONSTRUCTIBLE:
                this._element.addEventListener('click', () => this.createEventConstructible());
                break;
            case TYPE_TURRET:
                this._element.addEventListener('click', () => this.createEventTower());
                break;
        }
    }
    createEventConstructible() {
        const turretCost = 100;
        console.log('constructible', this._element, 'cost', turretCost);
        if (this.getPlayerGold() >= turretCost) {
            this.setPlayerGold(-turretCost);
            this.removeEvents();
            this.removeClasses();
            this._type = TYPE_TURRET;
            C.TEXTCONTENT_TILE && (this._element.textContent = this.getContent().toString());
            this.addClasses();
            this.createEvents();
        }
        else {
            console.log("%cOr insuffisant !", "color:red;");
        }
    }
    createEventTower() {
        console.log('tourelle', this._element);
    }
    removeEvents() {
        this._element.replaceWith((this._element = this._element.cloneNode(true)));
    }
    addClasses() {
        this._element.classList.add(arrTypeClasses[this._type]);
    }
    removeClasses() {
        this._element.classList.remove(arrTypeClasses[this._type]);
    }
    getContent() {
        return this._index;
    }
    getPlayerGold() {
        return this._map._game.interface.playerGold;
    }
    setPlayerGold(transaction) {
        this._map._game.interface.setGold(transaction);
    }
}
