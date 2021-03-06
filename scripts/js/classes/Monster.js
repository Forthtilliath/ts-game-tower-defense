import C, { LogStyles } from '../constants.js';
/**
 * La classe Monstre génère l'élément dans le DOM et controle son déplacement.
 */
export default class Monster {
    // prettier-ignore
    constructor({ id, name, life, movement, damages, flying, gold, type, wave, routeIndex }) {
        // Données du json
        this._id = id;
        this._name = name;
        this._life = life;
        this._movement = movement;
        this._flying = flying;
        this._gold = gold;
        this._damages = damages;
        this._type = type;
        this._container = document.querySelector('#monsters');
        this._element = this.createElement();
        this._wave = wave;
        this._route = this._wave.map.game.json.routes[routeIndex];
        this._target = -1;
    }
    //=======================
    // GETTERS ET SETTERS
    //=======================
    get element() {
        return this._element;
    }
    //=======================
    // METHODES
    //=======================
    /** Génère une div avec la classe tile ainsi que la classe correspondant à son type */
    createElement() {
        const div = document.createElement('div');
        div.classList.add('monster');
        return div;
    }
    /** Met en place le monstre sur la carte */
    initialPosition() {
        if (!this._container) {
            console.error(`%cErreur, le containeur pour les monstres n'a pas été trouvé !`, LogStyles.danger);
            return;
        }
        // Récupère la position et la taille de la case de départ de la route
        const rectTile = this._wave.map.tiles[this._route[0]].element.getBoundingClientRect();
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
    }
    /** Déplace le monstre sur la carte */
    move() {
        const rect = this._element.getBoundingClientRect();
        this._element.style.setProperty('top', rect.y + 5 + 'px');
        if (this.isTargetReached(rect)) {
            C.LOG_WAVE && console.log(`%cVague ${this._wave.waveNumber} Disparition du monstre`, LogStyles.success);
            this._wave.removeMonsterOfMap(this._element);
        }
    }
    /** Vérifie si le monster a atteint sa cible */
    isTargetReached(rect) {
        return rect.y > 666;
    }
    //=======================
    // ANIMATION
    //=======================
    updateStates(timestamp) {
        this.move();
    }
}
