import Map from './Map.js';
import Monster from './Monster.js';
/**
 * La classe Wave génère les monstres de la vague, leurs apparitions et disparitions
 * de la carte.
 */
export default class Wave {
    /** Permet d'accéder facilement à l'instance de Map pour la route */
    private _map;
    /** Numéro de la vague */
    private _waveNumber;
    /** Id de la vague */
    private _id?;
    /** Tableau des monstres de la vague */
    private _monsters?;
    /** Difficulté de la vague. Plus la valeur est élevée, plus la vague est complexe. */
    private _difficulty?;
    /** Or gagné par le joueur à la fin de la vague */
    private _gold?;
    /** Contient l'ensemble des monstres de la vague. */
    private _monstersToPop;
    /** Tableau contenant l'ensemble des monstres présent sur la map */
    private _monstersInMap;
    /** Timestamp création wave */
    private _createdAt;
    /** Vague terminée ou pas */
    private _finished;
    constructor(map: Map);
    get map(): Map;
    get waveNumber(): number;
    get monstersInMap(): Monster[];
    get monstersToPop(): Monster[];
    isFinished(): boolean;
    /**
     * Génère un tableau contenant l'ensemble des monstres de la vague. Si le monstre A doit
     * apparaitre 3 fois dans la vague, alors, il est 3 fois dans le tableau.
     *
     * Les propriétés de l'élément monsters du json ont le même nom que les attributs de la
     * classe Monster, ce qui permet d'instancier un Monster directement à partir des données
     * du json !
     *
     * On y ajoute l'élément Wave afin de donner accès à toutes les données de l'app.
     *
     * L'utilisation du reverse sur le tableau permet que lorsque l'on ajoutera les monstres
     * sur la map, on pourra supprimer à partir du dernier élément plutot que le premier.
     * Ca simplifiera son utilisation.
     */
    private generateMonstersToPop;
    /** Fait apparaitre un monstre sur la carte */
    private popMonster;
    /** Retire le monstre du tableau des monstres présent sur la carte */
    removeMonsterOfMap(element: HTMLElement): void;
    /** Compte le nombre de monstres restant : monstres sur la carte + monstres en attente */
    monstersRemaining(): number;
    /**
     * Gère l'apparition des monstres et leur déplacement sur la carte
     *
     * Cet update gère aussi le lancement de la vague suivante. Si celle ci
     * est la dernière, cela lancement la fin de la partie.
     */
    updateStates(timestamp: number): void;
}
