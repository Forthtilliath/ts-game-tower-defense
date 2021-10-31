import { trajCalculation } from '../utils.js';

/**
 *
 * La classe Bullet gère la création et la destruction des projectiles générés par les tourelles
 *
 * + moveBullet() : déplacement du projectile selon les coordonnées de la cible
 * + killBullet() : destruction du projectile une fois la cible atteinte
 */

export default class Bullet {
    x: number;
    y: number;
    tx: number;
    ty: number;
    speed: number;
    damages: number;
    element: HTMLDivElement;
    target: any;
    constructor(originX: number, originY: number, targetX: number, targetY: number, speed: number, damages: number) {
        /** origine X du projectile */
        this.x = originX;
        /** origine Y du projectile */
        this.y = originY;
        /** origine X de la cible */
        this.tx = targetX;
        /** origine Y de la cible */
        this.ty = targetY;
        /** Vitesse du projectile */
        this.speed = speed;
        /** Dégats du projectile */
        this.damages = damages;

        /** Création du projectile */
        this.element = this.createBullet();

        // Objet Monster => Monster.element.getBoundingClientRect() / Monster.getPosition()
        // this.target = target;
    }

    /**
     * Génère une div avec la classe bullet, positionnée selon les coordonnées définies dans les paramètres (position de la tourelle tirant le projectile)
     *
     * @returns {HTMLDivElement}
     */
    createBullet(): HTMLDivElement {
        const bullet = document.createElement('div');

        bullet.classList.add('bullet');

        bullet.style.left = `${this.x}px`;
        bullet.style.top = `${this.y}px`;

        document.body.appendChild(bullet);

        return bullet;
    }

    /**
     * Gestion du déplacement du projectile, selon la position et la distance le séparant de sa cible
     */
    moveBullet() {
        const delta = trajCalculation(this.x, this.y, this.tx, this.ty);

        if (delta.travelDistance < this.speed) {
            this.killBullet();
        } else {
            this.x = this.x + delta.x * this.speed;
            this.y = this.y + delta.y * this.speed;

            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }
    }

    /**
     * Suppression du projectile dans le DOM
     */
    killBullet() {
        this.element.remove();
    }
}
