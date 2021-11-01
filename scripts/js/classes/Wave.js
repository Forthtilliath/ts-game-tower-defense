import Monster from './Monster.js';
import utils from '../utils.js';
import C from '../constants.js';
export default class Wave {
    constructor({ id, monsters, gold, difficulty, jsonMonsters, map, waveNumber }) {
        this.map = map;
        this.waveNumber = waveNumber;
        this.id = id;
        this.jsonWaveMonsters = monsters;
        this.jsonMonsters = jsonMonsters;
        this.gold = gold;
        this.difficulty = difficulty;
        this.arrPopMonsters = this.generatePopMonsters();
        C.LOG_WAVE && console.log(this.arrPopMonsters);
        this.arrMonstersInMap = [];
        this.delaiBeforeNextWave = C.WAVE_DELAI * 1000;
        this.timeout = 0;
    }
    generatePopMonsters() {
        return (this.jsonWaveMonsters
            .reduce((arr, monster) => [
            ...arr,
            ...Array.from({ length: monster.quantity }, () => new Monster(utils.getContentById(monster.idMonster, this.jsonMonsters))),
        ], []));
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
