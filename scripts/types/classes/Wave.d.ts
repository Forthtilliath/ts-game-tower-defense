import Monster from './Monster.js';
import Map from './Map.js';
export default class Wave {
    map: Map;
    waveNumber: number;
    id?: number;
    monsters?: TJsonWaveMonster[];
    difficulty?: number;
    gold?: number;
    jsonMonsters: TJsonMonster[];
    arrPopMonsters: Monster[];
    arrMonstersInMap: Monster[];
    delaiBeforeNextWave: number;
    timeout: number;
    constructor({ map }: {
        map: Map;
    });
    generatePopMonsters(): Monster[];
    createEvents(): void;
    popMonster(): void;
    updateStates(timestamp: number): void;
}
