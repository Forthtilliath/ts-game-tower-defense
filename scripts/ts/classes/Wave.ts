import C, { LogStyles } from '../constants.js';
import utils from '../utils.js';
import Map from './Map.js';
import Monster from './Monster.js';

/**
 * La classe Wave génère les monstres de la vague, leurs apparitions et disparitions
 * de la carte.
 */
export default class Wave {
    /** Permet d'accéder facilement à l'instance de Map pour la route */
    private _map: Map;
    /** Numéro de la vague */
    private _waveNumber: number;
    /** Id de la vague */
    private _id?: number;
    /** Tableau des monstres de la vague */
    private _monsters?: TJsonWaveMonster[];
    /** Difficulté de la vague. Plus la valeur est élevée, plus la vague est complexe. */
    private _difficulty?: number;
    /** Or gagné par le joueur à la fin de la vague */
    private _gold?: number;
    /** Contient l'ensemble des monstres de la vague. */
    private _monstersToPop: Monster[];
    /** Tableau contenant l'ensemble des monstres présent sur la map */
    private _monstersInMap: Monster[];
    /** Timestamp création wave */
    private _createdAt: number;
    /** Vague terminée ou pas */
    private _finished: boolean;

    constructor(map: Map) {
        this._map = map;

        this._waveNumber = map.currentWaveIndex;
        this._createdAt = map.game.timestamp;

        // Récupère les données de la vague dans le json
        const wave = map.getWave();
        if (wave) {
            this._id = wave.id;
            this._monsters = wave.monsters;
            this._difficulty = wave.difficulty;
            this._gold = wave.gold;
        }

        this._monstersToPop = this.generateMonstersToPop();
        C.LOG_WAVE && this._monstersToPop.forEach(console.log);

        this._monstersInMap = [];
        this._finished = false;
    }

    //=======================
    // GETTERS ET SETTERS
    //=======================

    public get map() {
        return this._map;
    }

    public get waveNumber() {
        return this._waveNumber;
    }

    public get monstersInMap() {
        return this._monstersInMap;
    }

    public get monstersToPop() {
        return this._monstersToPop;
    }

    public isFinished() {
        return this._finished;
    }

    //=======================
    // METHODES
    //=======================

    /**
     * Génère un tableau contenant l'ensemble des monstres de la vague. Si le monstre A doit
     * apparaitre 3 fois dans la vague, alors, il est 3 fois dans le tableau.
     *
     * Les propriétés de l'élément monsters du json ont le même nom que les attributs de la
     * classe Monster, ce qui permet d'instancier un Monster directement à partir des données
     * du json !
     *
     * On y ajoute l'élément Wave afin de donner accès à toutes les données de l'app.
     *
     * L'utilisation du reverse sur le tableau permet que lorsque l'on ajoutera les monstres
     * sur la map, on pourra supprimer à partir du dernier élément plutot que le premier.
     * Ca simplifiera son utilisation.
     */
    private generateMonstersToPop(): Monster[] {
        if (!this._monsters) return [];

        return this._monsters
            .reduce(
                (arr: Monster[], monster: TJsonWaveMonster) => [
                    ...arr,
                    ...Array.from(
                        { length: monster.quantity },
                        () =>
                            new Monster({
                                ...utils.getContentById(monster.idMonster, this._map.game.json.monsters),
                                wave: this,
                                // Index de la route que le monstre va suivre
                                // NOTE : Faire en sorte que cette donnée vienne du json par la suite
                                routeIndex: 0,
                            }),
                    ),
                ],
                [],
            )
            .reverse();
    }

    /** Fait apparaitre un monstre sur la carte */
    private popMonster() {
        // Récupère le premier monstre du tableau d'apparition
        const monster = this._monstersToPop.pop();
        // S'il reste des monstres de la vague à lancer sur la carte
        if (monster) {
            C.LOG_WAVE && console.log(`%cVague ${this.waveNumber} Apparition du monstre`, LogStyles.alert);

            monster.initialPosition();

            // Le monstre est à présent sur la carte
            this._monstersInMap.push(monster);
        }
    }

    /** Retire le monstre du tableau des monstres présent sur la carte */
    public removeMonsterOfMap(element: HTMLElement) {
        this._monstersInMap = this._monstersInMap.filter((monster) => monster.element !== element);
        element.remove();

        C.LOG_WAVE && console.log('Monstres restant', this.monstersRemaining());
        if (!this.monstersRemaining()) {
            C.LOG_WAVE && console.log('Vague', this.waveNumber, 'terminée !');
            this._finished = true;
        }
    }

    /** Compte le nombre de monstres restant : monstres sur la carte + monstres en attente */
    public monstersRemaining() {
        return this._monstersInMap.length + this._monstersToPop.length;
    }

    // private getRoute(index: number) {
    //     return this._map.game.json.routes[index];
    // }

    //=======================
    // ANIMATION
    //=======================

    /**
     * Gère l'apparition des monstres et leur déplacement sur la carte
     *
     * Cet update gère aussi le lancement de la vague suivante. Si celle ci
     * est la dernière, cela lancement la fin de la partie.
     */
    public updateStates(timestamp: number) {
        // Déplace tous les monstres de la vague
        this._monstersInMap.forEach((monster) => monster.updateStates(timestamp));

        // Si le mouvement d'un monstre a provoqué la fin de la vague
        if (this._finished) {
            this._map.waveFinished(this);
            return;
        }

        if ((timestamp - this._createdAt) % (C.MONSTER_DELAI * 60) === 0) {
            this.popMonster();
        }
    }
}
