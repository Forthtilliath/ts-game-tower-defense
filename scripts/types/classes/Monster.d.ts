import Wave from './Wave.js';
export default class Monster {
    id: number;
    name: string;
    life: number;
    movement: number;
    flying: boolean;
    gold: number;
    damages: number;
    type: number;
    element: HTMLDivElement;
    route: number[];
    wave: Wave | undefined;
    container: any;
    constructor({ id, name, life, movement, damages, flying, gold, type }: TMonster);
    createElement(): HTMLDivElement;
    createEvents(): void;
    initialPosition(): void;
    setPosition(): void;
    setRoute(route: number[]): void;
    setWave(wave: Wave): void;
    updateStates(timestamp: number): void;
}
