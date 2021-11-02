import Monster from './Monster.js';
import utils from '../utils.js';
import C from '../constants.js';
export default class Wave {
    constructor({ map }) {
        this.map = map;
        this.waveNumber = map.currentWaveIndex;
        const wave = map.game.json.getWave(this.waveNumber);
        if (wave) {
            this.id = wave.id;
            this.monsters = wave.monsters;
            this.gold = wave.gold;
            this.id = wave.id;
        }
        this.jsonMonsters = map.game.json.monsters;
        this.arrPopMonsters = this.generatePopMonsters();
        C.LOG_WAVE && console.log(this.arrPopMonsters);
        this.arrMonstersInMap = [];
        this.delaiBeforeNextWave = C.WAVE_DELAI * 1000;
        this.timeout = 0;
    }
    generatePopMonsters() {
        if (!this.monsters)
            return [];
        return (this.monsters.reduce((arr, monster) => [
            ...arr,
            ...Array.from({ length: monster.quantity }, () => new Monster(utils.getContentById(monster.idMonster, this.jsonMonsters))),
        ], [])
            .reverse());
    }
    createEvents() {
        this.popMonster();
    }
    popMonster() {
        if (this.arrPopMonsters.length) {
            const monster = this.arrPopMonsters.pop();
            C.LOG_WAVE && console.log('Vague', this.id, 'Apparition du monstre', monster);
            monster?.setRoute(this.map.getRoutes()[0]);
            monster?.setWave(this);
            monster?.initialPosition();
            monster && this.arrMonstersInMap.push(monster);
        }
        else if (!this.timeout) {
            this.timeout = setTimeout(() => {
                this.map.nextWave();
            }, this.delaiBeforeNextWave);
        }
    }
    updateStates(timestamp) {
        if (timestamp % (C.MONSTER_DELAI * 60) === 0) {
            this.popMonster();
        }
        this.arrMonstersInMap.forEach((monster) => monster.updateStates(timestamp));
    }
}
