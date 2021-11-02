import Wave from './Wave.js';
import C from '../constants.js';

const TYPE_COMMON: number = 0;
const TYPE_RARE: number = 1;
const TYPE_ELITE: number = 2;
const TYPE_BOSS: number = 3;

const TypeMonster: ObjectType = {
    [TYPE_COMMON]: 'Common',
    [TYPE_RARE]: 'Rare',
    [TYPE_ELITE]: 'Elite',
    [TYPE_BOSS]: 'Boss',
};

/**
 * La classe Monstre gère le monstre en lui-même.
 *
 * + createElement() : Génère une div avec la classe tile ainsi que la classe correspondant à son type
 * + createEvents() : Génère les évènements du monstre (apparition, déplacement, disparition)
 * + startMove() : Met en place le monstre sur la carte
 * + setRoute() : Met à jour la route du monstre
 * + setWave() : Met à jour la vague à laquelle le monstre appartient
 */
export default class Monster {
    private _id: number;
    private _name: string;
    private _life: number;
    private _movement: number;
    private _flying: boolean;
    private _gold: number;
    private _damages: number;
    private _type: number;
    private _element: HTMLDivElement;
    private _route: number[];
    private _wave: Wave | undefined;
    private _container: any;

    constructor({ id, name, life, movement, damages, flying, gold, type }: TMonster) {
        // Données du json
        this._id = id;
        this._name = name;
        this._life = life;
        this._movement = movement;
        this._flying = flying;
        this._gold = gold;
        this._damages = damages;
        this._type = type;

        /**
         * Element du DOM lié à la case
         * @type {HTMLDivElement}
         */
        this._element = this.createElement();

        /**
         * Route que le monstre va suivre
         * @type number[]
         */
        this._route = [];

        /**
         * Wave à laquelle le monstre appartient
         * @type Wave
         */
        this._wave = undefined;

        /**
         * Container des monsters
         * @type {HTMLDivElement}
         */
        this._container = document.querySelector('#monsters');
    }

    /**
     * Génère une div avec la classe tile ainsi que la classe correspondant à son type
     * @returns {HTMLDivElement}
     */
    createElement() {
        const div = document.createElement('div');
        div.classList.add('monster');

        return div;
    }

    createEvents() {
        // Mouvement du monstre
    }

    /**
     * Met en place le monstre sur la carte
     */
    initialPosition() {
        // Récupère la position et la taille de la carte de départ de la vague
        const rectTile = this._wave!.map._arrTiles[this._route[0]].element.getBoundingClientRect();

        // Met à jour la position et la taille de la div du monstre
        // WARNING : La div n'est pas redimensionnée avec la page
        const style = {
            left: rectTile.x + 'px',
            top: rectTile.y + 'px',
            width: rectTile.width + 'px',
            height: rectTile.height + 'px',
        };
        Object.assign(this._element.style, style);

        // Ajoute le monstre au body afin de pouvoir le déplacer plus facilement d'une case à une autre
        this._container.appendChild(this._element);

        // Génère les évènements pour le faire se déplacer sur la route
        this.createEvents();
    }

    /**
     * Met à jour la position du monstre
     */
    setPosition() {
        const rect = this._element.getBoundingClientRect();
        this._element.style.setProperty('top', rect.y + 5 + 'px');

        // Si le monstre a atteint la sortie
        if (rect.y > 666) {
            C.LOG_WAVE && console.log('Vague', this._wave!.waveNumber, 'Disparition du monstre', this);
            // Retire le monstre du tableau
            this._wave!.arrMonstersInMap = this._wave!.arrMonstersInMap.filter(
                (monster) => monster._element !== this._element,
            );
            // Retire le monstre du dom
            this._element.remove();

            // On vérifie qu'il ne reste pas des monstre sur le carte ainsi qu'à apparaitre
            if (!(this._wave!.arrMonstersInMap.length + this._wave!.arrPopMonsters.length)) {
                // Retire la vague du tableau
                this._wave!.map._currentWaves = this._wave!.map._currentWaves.filter((wave) => wave !== this._wave);
                C.LOG_WAVE && console.log('Vague', this._wave!.waveNumber, 'terminée !');

                // Si c'était la dernière vague de la map, on termine le jeu
                if (this._wave!.map._finished) {
                    // this.wave!.map.game.stop();
                    this._wave!.map._game.setPlaying();
                }
            }
        }
    }

    /**
     * Met à jour la route du monstre
     */
    setRoute(route: number[]) {
        this._route = route;
    }

    /**
     * Met à jour la vague à laquelle le monstre appartient
     */
    setWave(wave: Wave) {
        this._wave = wave;
    }

    updateStates(timestamp: number) {
        this.setPosition();
    }
}
