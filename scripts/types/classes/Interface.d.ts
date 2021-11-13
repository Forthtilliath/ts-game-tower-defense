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
    set(player?: TJsonPlayer, waveMax?: number): void;
    private setDisplay;
    setGold(gold: number): void;
    setLife(life: number): void;
    setWave(wave: number): void;
    private anim;
}
