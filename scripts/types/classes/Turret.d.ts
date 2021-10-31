export default class Turret {
    x: number;
    y: number;
    range: number;
    speed: number;
    bulletSpeed: number;
    bulletDamages: number;
    element: HTMLDivElement;
    constructor(x: number, y: number, range: number, speed: number, bulletSpeed: number, bulletDamages: number);
    createTurret(): HTMLDivElement;
    turretShot(tx: number, ty: number): object;
}
