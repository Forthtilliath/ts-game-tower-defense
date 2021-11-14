import Wave from './Wave.js';
/**
 * La classe Monstre génère l'élément dans le DOM et controle son déplacement.
 */
export default class Monster {
    /** Element HTML du monstre */
    private _element;
    /** Id du monstre */
    private _id;
    /** Nom du monstre */
    private _name;
    /** Points de vie du monstre */
    private _life;
    /** Vitesse de déplacement du monstre (1 correspond à 1 case) */
    private _movement;
    /** Monstre volant ou pas */
    private _flying;
    /** Or gagné en tuant le monstre */
    private _gold;
    /** Dégâts subit par le nexus si le monstre l'atteint */
    private _damages;
    /** Type du monstre */
    private _type;
    /** Route que le monstre va suivre pour atteindre le nexus */
    private _route;
    /** Vague à laquelle appartient le monstre */
    private _wave;
    /** Element où tous les monstres sont dans le DOM */
    private _container;
    /** Target du monstre, correspond à l'index du tableau de route */
    private _target;
    constructor({ id, name, life, movement, damages, flying, gold, type, wave, routeIndex }: TMonster & {
        wave: Wave;
    });
    get element(): HTMLElement;
    /** Génère une div avec la classe tile ainsi que la classe correspondant à son type */
    private createElement;
    /** Met en place le monstre sur la carte */
    initialPosition(): void;
    /** Déplace le monstre sur la carte */
    private move;
    /** Vérifie si le monster a atteint sa cible */
    private isTargetReached;
    updateStates(timestamp: number): void;
}
