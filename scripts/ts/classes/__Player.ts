import utils from "../utils";

export default  class Player {
    private _gold: number;
    private _life: number;

    constructor(player:TJsonPlayer) {
        this._gold = player.startGold;
        this._life = player.startLife;
    }

    public setGold(transaction: number) {
        this._gold += transaction;
        utils.launchEvent('changeinterface', { gold: this._gold });
    }

    public setLife(modificator: number) {
        this._life += modificator;
        utils.launchEvent('changeinterface', { life: this._life });
    }
}
