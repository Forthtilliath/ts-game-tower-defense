import Map from './Map.js';
import Monster from './Monster.js';
export default class Wave {
    private _map;
    private _waveNumber;
    private _id?;
    private _monsters?;
    private _difficulty?;
    private _gold?;
    private _monstersToPop;
    private _monstersInMap;
    private _createdAt;
    private _finished;
    constructor(map: Map);
    get map(): Map;
    get waveNumber(): number;
    get monstersInMap(): Monster[];
    get monstersToPop(): Monster[];
    isFinished(): boolean;
    private generateMonstersToPop;
    private popMonster;
    removeMonsterOfMap(element: HTMLElement): void;
    monstersRemaining(): number;
    updateStates(timestamp: number): void;
}
