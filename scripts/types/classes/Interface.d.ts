import Game from './Game.js';
export default class Interface {
    /** Instance de Game */
    private _game;
    /** Element affichant le montant d'or */
    private _playerGoldElement;
    /** Element affichant le nombre de vies */
    private _playerLifeElement;
    /** Element affichant le statut des vagues */
    private _waveNumberElement;
    /** Element pour modifier l'état du jeu */
    private _btnStartWaveElement;
    /** Montant d'or */
    private _playerGold;
    /** Nombre de vies */
    private _playerLife;
    /** Numéro de la vague en cours */
    private _waveNumber;
    /** Nombre maximum de vagues de la carte en cours */
    private _waveMax;
    constructor(game: Game, player?: TJsonPlayer, waveMax?: number);
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
    setWave(): void;
    /** Anime la modification de valeur d'un champ pour une durée de 300ms */
    private anim;
    /** Event du bouton de l'état du jeu */
    private handleGame;
}
