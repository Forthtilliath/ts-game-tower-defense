import C, { LogStyles } from '../constants.js';
import utils from '../utils.js';
import Monster from './Monster.js';
/**
 * La classe Wave génère les monstres de la vague, leurs apparitions et disparitions
 * de la carte.
 */
export default class Wave {
    constructor(map) {
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
    get map() {
        return this._map;
    }
    get waveNumber() {
        return this._waveNumber;
    }
    get monstersInMap() {
        return this._monstersInMap;
    }
    get monstersToPop() {
        return this._monstersToPop;
    }
    isFinished() {
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
    generateMonstersToPop() {
        if (!this._monsters)
            return [];
        return this._monsters
            .reduce((arr, monster) => [
            ...arr,
            ...Array.from({ length: monster.quantity }, () => new Monster({
                ...utils.getContentById(monster.idMonster, this._map.game.json.monsters),
                wave: this,
                // Index de la route que le monstre va suivre
                // NOTE : Faire en sorte que cette donnée vienne du json par la suite
                routeIndex: 0,
            })),
        ], [])
            .reverse();
    }
    /** Fait apparaitre un monstre sur la carte */
    popMonster() {
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
    removeMonsterOfMap(element) {
        this._monstersInMap = this._monstersInMap.filter((monster) => monster.element !== element);
        element.remove();
        C.LOG_WAVE && console.log('Monstres restant', this.monstersRemaining());
        if (!this.monstersRemaining()) {
            C.LOG_WAVE && console.log('Vague', this.waveNumber, 'terminée !');
            this._finished = true;
        }
    }
    /** Compte le nombre de monstres restant : monstres sur la carte + monstres en attente */
    monstersRemaining() {
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
    updateStates(timestamp) {
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
