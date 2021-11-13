import Wave from './Wave.js';
export default class Monster {
    private _element;
    private _id;
    private _name;
    private _life;
    private _movement;
    private _flying;
    private _gold;
    private _damages;
    private _type;
    private _route;
    private _wave;
    private _container;
    private _target;
    constructor({ id, name, life, movement, damages, flying, gold, type, wave, routeIndex }: TMonster & {
        wave: Wave;
    });
    get element(): HTMLElement;
    private createElement;
    initialPosition(): void;
    private move;
    private isTargetReached;
    updateStates(timestamp: number): void;
}
