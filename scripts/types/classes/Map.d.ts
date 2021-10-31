import Wave from './Wave.js';
export default class Map {
    game: any;
    private element;
    private nbTiles;
    arrTiles: any[];
    private jsonMapRoutes;
    private jsonMonsters;
    private currentWaveIndex;
    private waves;
    currentWaves: Wave[];
    finished: boolean;
    constructor({ element, tiles, nbTiles, waves, jsonMonsters, jsonMapRoutes, game }: TMap);
    generateWave(): Wave;
    nextWave(): void;
    generateDom(): void;
    getRoutes(): number[][];
    createEvents(): void;
    updateStates(timestamp: number): void;
    waveIteration(fn: (wave: Wave) => void): void;
    waveIteration2(fn: (wave: Wave) => void): void[];
}
