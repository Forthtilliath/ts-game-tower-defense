import C from '../constants.js';
const TYPE_COMMON = 0;
const TYPE_RARE = 1;
const TYPE_ELITE = 2;
const TYPE_BOSS = 3;
const TypeMonster = {
    [TYPE_COMMON]: 'Common',
    [TYPE_RARE]: 'Rare',
    [TYPE_ELITE]: 'Elite',
    [TYPE_BOSS]: 'Boss',
};
export default class Monster {
    constructor({ id, name, life, movement, damages, flying, gold, type }) {
        this._id = id;
        this._name = name;
        this._life = life;
        this._movement = movement;
        this._flying = flying;
        this._gold = gold;
        this._damages = damages;
        this._type = type;
        this._element = this.createElement();
        this._route = [];
        this._wave = undefined;
        this._container = document.querySelector('#monsters');
    }
    createElement() {
        const div = document.createElement('div');
        div.classList.add('monster');
        return div;
    }
    createEvents() {
    }
    initialPosition() {
        const rectTile = this._wave.map._arrTiles[this._route[0]].element.getBoundingClientRect();
        const style = {
            left: rectTile.x + 'px',
            top: rectTile.y + 'px',
            width: rectTile.width + 'px',
            height: rectTile.height + 'px',
        };
        Object.assign(this._element.style, style);
        this._container.appendChild(this._element);
        this.createEvents();
    }
    setPosition() {
        const rect = this._element.getBoundingClientRect();
        this._element.style.setProperty('top', rect.y + 5 + 'px');
        if (rect.y > 666) {
            C.LOG_WAVE && console.log('Vague', this._wave.waveNumber, 'Disparition du monstre', this);
            this._wave.arrMonstersInMap = this._wave.arrMonstersInMap.filter((monster) => monster._element !== this._element);
            this._element.remove();
            if (!(this._wave.arrMonstersInMap.length + this._wave.arrPopMonsters.length)) {
                this._wave.map._currentWaves = this._wave.map._currentWaves.filter((wave) => wave !== this._wave);
                C.LOG_WAVE && console.log('Vague', this._wave.waveNumber, 'terminée !');
                if (this._wave.map._finished) {
                    this._wave.map._game.setPlaying();
                }
            }
        }
    }
    setRoute(route) {
        this._route = route;
    }
    setWave(wave) {
        this._wave = wave;
    }
    updateStates(timestamp) {
        this.setPosition();
    }
}
