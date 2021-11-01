import C from '../constants.js';

const TYPE_DECOR: number = 0;
const TYPE_START: number = 1;
const TYPE_ROUTE: number = 2;
const TYPE_END: number = 3;
const TYPE_CONSTRUCTIBLE: number = 4;
const TYPE_TURRET: number = 5;

/**
 * Tableau contenant les classes à ajouter en fonction du type
 */
const arrTypeClasses: ObjectType = {
    [TYPE_DECOR]: 'decor',
    [TYPE_START]: 'start',
    [TYPE_ROUTE]: 'route',
    [TYPE_END]: 'end',
    [TYPE_CONSTRUCTIBLE]: 'constructible',
    [TYPE_TURRET]: 'turret',
};

export default class Tile {
    private index: number;
    private type: number;
    private element: HTMLDivElement;
    
    constructor({ type, index }: TTile) {
        /** Index de la case dans le tableau global */
        this.index = index;
        /** Type de case */
        this.type = type;
        /** Element du DOM lié à la case */
        this.element = this.createElement();

        this.addClasses();
        this.createEvents();
    }

    /** Génère une div avec la classe tile ainsi que la classe correspondant à son type */
    createElement():HTMLDivElement {
        const div = document.createElement('div');
        div.classList.add('tile');
        // div.textContent = this.getContent().toString();

        return div;
    }

    /** Génère les events de la case en fonction du type de case que c'est */
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

    /**
     * Event lorsque l'on clique sur une case constructible
     * Actuellement, cliquer sur une case constructible la transforme directement en tourelle
     */
    createEventConstructible() {
        console.log('constructible', this.element);

        this.removeEvents();
        this.removeClasses();
        this.type = TYPE_TURRET;
        // this.element.textContent = this.getContent().toString();
        this.createEvents();
        this.addClasses();
    }

    /**
     * Event lorsque l'on clique sur une case tourelle
     * Actuellement, cliquer sur une case tower ne fait rien de spécial
     */
    createEventTower() {
        console.log('tourelle', this.element);
    }

    /** Supprime tous les events de l'éléments en faisant une copie de l'élément */
    removeEvents() {
        this.element.replaceWith((this.element = this.element.cloneNode(true) as HTMLDivElement));
    }

    /** Ajoute la classe CSS à la case en fonction de son type */
    addClasses() {
        this.element.classList.add(arrTypeClasses[this.type]);
    }

    /** Retire la classe CSS en rapport avec le type de case */
    removeClasses() {
        // this.element.classList.remove(...arrTypeClasses);
        this.element.classList.remove(arrTypeClasses[this.type]);
    }

    /** Contenu à mettre dans la div */
    getContent() {
        return this.index;
    }
}
