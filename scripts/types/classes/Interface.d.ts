export default class Interface {
    /** Element affichant le montant d'or */
    private _playerGoldElement;
    /** Element affichange le nombre de vies */
    private _playerLifeElement;
    /** Element affichange le statut des vagues */
    private _waveNumberElement;
    /** Montant d'or */
    private _playerGold;
    /** Nombre de vies */
    private _playerLife;
    /** Numéro de la vague en cours */
    private _waveNumber;
    /** Nombre maximum de vagues de la carte en cours */
    private _waveMax;
    constructor(player?: TJsonPlayer, waveMax?: number);
    get playerGold(): number;
    private get wave();
    /** Met à jour les valeurs */
    set(player?: TJsonPlayer, waveMax?: number): void;
    /** Met à jour l'affichage */
    private setDisplay;
    /** Met à jour le montant d'or du joueur */
    setGold(gold: number): void;
    /** Met à jour le nombre de vie du joueur */
    setLife(life: number): void;
    /** Met à jour le numéro de la vague en cours */
    setWave(wave: number): void;
    /** Anime la modification de valeur d'un champ pour une durée de 300ms */
    private anim;
}
