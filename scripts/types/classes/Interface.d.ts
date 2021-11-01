export default class Interface {
    private _playerGoldElement;
    private _playerLifeElement;
    private _waveNumberElement;
    private _playerGold;
    private _playerLife;
    private _waveNumber;
    private _waveMax;
    constructor(player?: TJsonPlayer, waveMax?: number);
    get playerGold(): number;
    private get wave();
    private handleValues;
    set(player?: TJsonPlayer, waveMax?: number): void;
    setGold(gold: number): void;
    setLife(life: number): void;
    setWave(wave: number): void;
    private anim;
}
