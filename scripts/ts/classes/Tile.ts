import C from '../constants.js';
import utils from '../utils.js';
import Map from './Map.js';

const TYPE_DECOR: number = 0;
const TYPE_START: number = 1;
const TYPE_ROUTE: number = 2;
const TYPE_END: number = 3;
const TYPE_CONSTRUCTIBLE: number = 4;
const TYPE_TURRET: number = 5;

/** Tableau contenant les classes à ajouter en fonction du type */
const arrTypeClasses: ObjectType = {
    [TYPE_DECOR]: 'decor',
    [TYPE_START]: 'start',
    [TYPE_ROUTE]: 'route',
    [TYPE_END]: 'end',
    [TYPE_CONSTRUCTIBLE]: 'constructible',
    [TYPE_TURRET]: 'turret',
};

export default class Tile {
    /** Index de la case dans le tableau global */
    private _index: number;
    /** Type de case */
    private _type: number;
    /** Element du DOM lié à la case */
    private _element: HTMLDivElement;
    /** Map en cours */
    private _map: Map;

    constructor({ type, index, map }: TTile) {
        this._index = index;
        this._type = type;
        this._map = map;
        this._element = this.createElement();

        this.addClasses();
        this.createEvents();
    }

    public get element() {
        return this._element;
    }

    /** Génère une div avec la classe tile ainsi que la classe correspondant à son type */
    createElement(): HTMLDivElement {
        const div = document.createElement('div');
        div.classList.add('tile');
        C.TEXTCONTENT_TILE && (div.textContent = this.getContent().toString());

        return div;
    }

    /** Génère les events de la case en fonction du type de case que c'est */
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

    /**
     * Event lorsque l'on clique sur une case constructible
     * Actuellement, cliquer sur une case constructible la transforme directement en tourelle
     */
    createEventConstructible() {
        const turretCost = 100;
        console.log('constructible', this._element, 'cost', turretCost);
        if (this.getPlayerGold() >= turretCost) {
            // Met à jour l'or du joueur
            this.setPlayerGold(-turretCost);

            // 
            this.removeEvents();
            this.removeClasses();
            this._type = TYPE_TURRET;
            C.TEXTCONTENT_TILE && (this._element.textContent = this.getContent().toString());
            this.addClasses();
            this.createEvents();
        } else {
            console.log("%cOr insuffisant !", "color:red;");
        }
    }

    /**
     * Event lorsque l'on clique sur une case tourelle
     * Actuellement, cliquer sur une case tower ne fait rien de spécial
     */
    createEventTower() {
        console.log('tourelle', this._element);
    }

    /** Supprime tous les events de l'éléments en faisant une copie de l'élément */
    removeEvents() {
        this._element.replaceWith((this._element = this._element.cloneNode(true) as HTMLDivElement));
    }

    /** Ajoute la classe CSS à la case en fonction de son type */
    addClasses() {
        this._element.classList.add(arrTypeClasses[this._type]);
    }

    /** Retire la classe CSS en rapport avec le type de case */
    removeClasses() {
        // this.element.classList.remove(...arrTypeClasses);
        this._element.classList.remove(arrTypeClasses[this._type]);
    }

    /** Contenu à mettre dans la div */
    getContent() {
        return this._index;
    }

    /** Récupère le montant d'or du joueur */
    getPlayerGold() {
        return this._map._game.interface.playerGold;
    }

    /** Récupère le montant d'or du joueur */
    setPlayerGold(transaction: number) {
        this._map._game.interface.setGold(transaction);
    }
}
