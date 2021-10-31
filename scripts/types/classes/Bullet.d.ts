export default class Bullet {
    x: number;
    y: number;
    tx: number;
    ty: number;
    speed: number;
    damages: number;
    element: HTMLDivElement;
    target: any;
    constructor(originX: number, originY: number, targetX: number, targetY: number, speed: number, damages: number);
    createBullet(): HTMLDivElement;
    moveBullet(): void;
    killBullet(): void;
}
