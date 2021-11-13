import C from '../constants.js';
import utils from '../utils.js';
import Monster from './Monster.js';
export default class Wave {
    constructor(map) {
        this._map = map;
        this._waveNumber = map.currentWaveIndex;
        this._createdAt = map.game.timestamp;
        const wave = map.getWave();
        if (wave) {
            this._id = wave.id;
            this._monsters = wave.monsters;
            this._difficulty = wave.difficulty;
            this._gold = wave.gold;
        }
        this._monstersToPop = this.generateMonstersToPop();
        C.LOG_WAVE && console.log(this._monstersToPop);
        this._monstersInMap = [];
        this._finished = false;
    }
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
    generateMonstersToPop() {
        if (!this._monsters)
            return [];
        return this._monsters
            .reduce((arr, monster) => [
            ...arr,
            ...Array.from({ length: monster.quantity }, () => new Monster({
                ...utils.getContentById(monster.idMonster, this._map.game.json.monsters),
                wave: this,
                routeIndex: 0,
            })),
        ], [])
            .reverse();
    }
    popMonster() {
        const monster = this._monstersToPop.pop();
        if (monster) {
            C.LOG_WAVE && console.log('Vague', this._waveNumber, 'Apparition du monstre');
            monster.initialPosition();
            this._monstersInMap.push(monster);
        }
    }
    removeMonsterOfMap(element) {
        this._monstersInMap = this._monstersInMap.filter((monster) => monster.element !== element);
        element.remove();
        C.LOG_WAVE && console.log('Monstres restant', this.monstersRemaining());
        if (!this.monstersRemaining()) {
            C.LOG_WAVE && console.log('Vague', this.waveNumber, 'terminée !');
            this._finished = true;
        }
    }
    monstersRemaining() {
        return this._monstersInMap.length + this._monstersToPop.length;
    }
    updateStates(timestamp) {
        this._monstersInMap.forEach((monster) => monster.updateStates(timestamp));
        if (this._finished) {
            this._map.waveFinished(this);
            return;
        }
        if ((timestamp - this._createdAt) % (C.MONSTER_DELAI * 60) === 0) {
            this.popMonster();
        }
    }
}
