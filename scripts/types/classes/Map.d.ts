import Tile from './Tile.js';
import Wave from './Wave.js';
import Game from './Game.js';
export default class Map {
    _game: Game;
    private _element;
    private _nbTiles;
    _arrTiles: Tile[];
    private _jsonMapRoutes;
    private _jsonMonsters;
    private _currentWaveIndex;
    private _waves;
    _currentWaves: Wave[];
    _finished: boolean;
    constructor(game: Game);
    generateArrayOfTiles(): Tile[];
    generateWave(): Wave;
    nextWave(): void;
    generateDom(): void;
    getRoutes(): number[][];
    createEvents(): void;
    updateStates(timestamp: number): void;
    waveIteration(fn: (wave: Wave) => void): void;
    waveIteration2(fn: (wave: Wave) => void): void[];
}
