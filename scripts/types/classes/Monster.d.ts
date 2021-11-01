import Wave from './Wave.js';
export default class Monster {
    private _id;
    private _name;
    private _life;
    private _movement;
    private _flying;
    private _gold;
    private _damages;
    private _type;
    private _element;
    private _route;
    private _wave;
    private _container;
    constructor({ id, name, life, movement, damages, flying, gold, type }: TMonster);
    createElement(): HTMLDivElement;
    createEvents(): void;
    initialPosition(): void;
    setPosition(): void;
    setRoute(route: number[]): void;
    setWave(wave: Wave): void;
    updateStates(timestamp: number): void;
}
