import Monster from './Monster.js';
import Map from './Map.js';
export default class Wave {
    map: Map;
    waveNumber: number;
    id: number;
    jsonWaveMonsters: TWaveMonster[];
    jsonMonsters: object[];
    gold: number;
    difficulty: number;
    arrPopMonsters: Monster[];
    arrMonstersInMap: Monster[];
    delaiBeforeNextWave: number;
    timeout: number;
    constructor({ id, monsters, gold, difficulty, jsonMonsters, map, waveNumber }: TWave);
    generatePopMonsters(): Monster[];
    createEvents(): void;
    popMonster(): void;
    updateStates(timestamp: number): void;
}
