import C, { LogStyles } from '../constants.js';
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
    /** Map en cours */
    private _map: Map;
    /** Index de la case dans le tableau global */
    private _index: number;
    /** Type de case */
    private _type: number = TYPE_DECOR;
    /** Element du DOM lié à la case */
    private _element: HTMLDivElement;

    public constructor({ type, index, map }: TTile) {
        this._map = map;
        this._index = index;
        this._element = this.createElement();

        this.setElement(type);
    }

    //=======================
    // GETTERS ET SETTERS
    //=======================

    public get element() {
        return this._element;
    }

    /** Contenu à mettre dans la div */
    private getContent() {
        return this._index;
    }

    /** Récupère le montant d'or du joueur */
    private getPlayerGold() {
        return this._map.game.interface.playerGold;
    }

    /** Met à jour le montant d'or du joueur */
    private setPlayerGold(transaction: number) {
        this._map.game.interface.setGold(transaction);
    }

    //=======================
    // METHODES
    //=======================

    /** Génère une div avec la classe tile ainsi que la classe correspondant à son type */
    private createElement(): HTMLDivElement {
        const div = document.createElement('div');
        div.classList.add('tile');
        C.TEXTCONTENT_TILE && (div.textContent = this.getContent().toString());

        return div;
    }

    /** Génère les events de la case en fonction du type de case que c'est */
    private createEvents() {
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
    private createEventConstructible() {
        const turretCost = 100;
        console.log('constructible', this._element, 'cost', turretCost);

        // Si le joueur a assez d'or pour acheter la tourelle
        if (this.getPlayerGold() >= turretCost) {
            this.setPlayerGold(-turretCost);
            this.resetElement();
            this.setElement(TYPE_TURRET);
        } else {
            console.log('%cOr insuffisant !', LogStyles.danger);
        }
    }

    /**
     * Event lorsque l'on clique sur une case tourelle
     * Actuellement, cliquer sur une case tower ne fait rien de spécial
     */
    private createEventTower() {
        console.log('tourelle', this._element);
    }

    /** Supprime tous les events de l'éléments en faisant une copie de l'élément */
    private removeEvents() {
        this._element.replaceWith((this._element = this._element.cloneNode(true) as HTMLDivElement));
    }

    /** Ajoute la classe CSS à la case en fonction de son type */
    private addClasses() {
        this._element.classList.add(arrTypeClasses[this._type]);
    }

    /** Retire la classe CSS en rapport avec le type de case */
    private removeClasses() {
        this._element.classList.remove(arrTypeClasses[this._type]);
    }

    /** Reset l'élément */
    private resetElement() {
        this.removeEvents();
        this.removeClasses();
    }

    /** Personnifie l'élément */
    private setElement(type: number) {
        this._type = type;
        C.TEXTCONTENT_TILE && (this._element.textContent = this.getContent().toString());
        this.addClasses();
        this.createEvents();
    }
}
