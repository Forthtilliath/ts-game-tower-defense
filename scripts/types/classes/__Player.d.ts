export default class Player {
    private _gold;
    private _life;
    constructor(player: TJsonPlayer);
    setGold(transaction: number): void;
    setLife(modificator: number): void;
}
