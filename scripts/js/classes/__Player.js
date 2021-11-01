import utils from "../utils";
export default class Player {
    constructor(player) {
        this._gold = player.startGold;
        this._life = player.startLife;
    }
    setGold(transaction) {
        this._gold += transaction;
        utils.launchEvent('changeinterface', { gold: this._gold });
    }
    setLife(modificator) {
        this._life += modificator;
        utils.launchEvent('changeinterface', { life: this._life });
    }
}
