import Bullet from './Bullet.js';
export default class Turret {
    constructor(x, y, range, speed, bulletSpeed, bulletDamages) {
        this.x = x;
        this.y = y;
        this.range = range;
        this.speed = speed;
        this.bulletSpeed = bulletSpeed;
        this.bulletDamages = bulletDamages;
        this.element = this.createTurret();
    }
    createTurret() {
        const turret = document.createElement('div');
        turret.classList.add('turret');
        turret.style.left = `${this.x}px`;
        turret.style.top = `${this.y}px`;
        document.body.appendChild(turret);
        return turret;
    }
    turretShot(tx, ty) {
        const bullet = new Bullet(this.x, this.y, tx, ty, this.bulletSpeed, 0);
        return bullet;
    }
}
