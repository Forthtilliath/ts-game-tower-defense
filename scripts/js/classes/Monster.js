import C, { LogStyles } from '../constants.js';
export default class Monster {
    constructor({ id, name, life, movement, damages, flying, gold, type, wave, routeIndex }) {
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
    get element() {
        return this._element;
    }
    createElement() {
        const div = document.createElement('div');
        div.classList.add('monster');
        return div;
    }
    initialPosition() {
        if (!this._container) {
            console.error(`%cErreur, le containeur pour les monstres n'a pas été trouvé !`, LogStyles.error);
            return;
        }
        const rectTile = this._wave.map.tiles[this._route[0]].element.getBoundingClientRect();
        const style = {
            left: rectTile.x + 'px',
            top: rectTile.y + 'px',
            width: rectTile.width + 'px',
            height: rectTile.height + 'px',
        };
        Object.assign(this._element.style, style);
        this._container.appendChild(this._element);
    }
    move() {
        const rect = this._element.getBoundingClientRect();
        this._element.style.setProperty('top', rect.y + 5 + 'px');
        if (this.isTargetReached(rect)) {
            C.LOG_WAVE && console.log('Vague', this._wave.waveNumber, 'Disparition du monstre');
            this._wave.removeMonsterOfMap(this._element);
        }
    }
    isTargetReached(rect) {
        return rect.y > 666;
    }
    updateStates(timestamp) {
        this.move();
    }
}
