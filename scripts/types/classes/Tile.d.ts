export default class Tile {
    /** Map en cours */
    private _map;
    /** Index de la case dans le tableau global */
    private _index;
    /** Type de case */
    private _type;
    /** Element du DOM lié à la case */
    private _element;
    constructor({ type, index, map }: TTile);
    get element(): HTMLDivElement;
    /** Contenu à mettre dans la div */
    private getContent;
    /** Récupère le montant d'or du joueur */
    private getPlayerGold;
    /** Met à jour le montant d'or du joueur */
    private setPlayerGold;
    /** Génère une div avec la classe tile ainsi que la classe correspondant à son type */
    private createElement;
    /** Génère les events de la case en fonction du type de case que c'est */
    private createEvents;
    /**
     * Event lorsque l'on clique sur une case constructible
     * Actuellement, cliquer sur une case constructible la transforme directement en tourelle
     */
    private createEventConstructible;
    /**
     * Event lorsque l'on clique sur une case tourelle
     * Actuellement, cliquer sur une case tower ne fait rien de spécial
     */
    private createEventTower;
    /** Supprime tous les events de l'éléments en faisant une copie de l'élément */
    private removeEvents;
    /** Ajoute la classe CSS à la case en fonction de son type */
    private addClasses;
    /** Retire la classe CSS en rapport avec le type de case */
    private removeClasses;
    /** Reset l'élément */
    private resetElement;
    /** Personnifie l'élément */
    private setElement;
}
