import { trajCalculation } from '../utils.js';
export default class Bullet {
    constructor(originX, originY, targetX, targetY, speed, damages) {
        this.x = originX;
        this.y = originY;
        this.tx = targetX;
        this.ty = targetY;
        this.speed = speed;
        this.damages = damages;
        this.element = this.createBullet();
    }
    createBullet() {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = `${this.x}px`;
        bullet.style.top = `${this.y}px`;
        document.body.appendChild(bullet);
        return bullet;
    }
    moveBullet() {
        const delta = trajCalculation(this.x, this.y, this.tx, this.ty);
        if (delta.travelDistance < this.speed) {
            this.killBullet();
        }
        else {
            this.x = this.x + delta.x * this.speed;
            this.y = this.y + delta.y * this.speed;
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }
    }
    killBullet() {
        this.element.remove();
    }
}
