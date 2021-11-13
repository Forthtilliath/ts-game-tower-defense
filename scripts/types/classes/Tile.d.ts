export default class Tile {
    private _map;
    private _index;
    private _type;
    private _element;
    constructor({ type, index, map }: TTile);
    get element(): HTMLDivElement;
    private getContent;
    private getPlayerGold;
    private setPlayerGold;
    private createElement;
    private createEvents;
    private createEventConstructible;
    private createEventTower;
    private removeEvents;
    private addClasses;
    private removeClasses;
    private resetElement;
    private setElement;
}
