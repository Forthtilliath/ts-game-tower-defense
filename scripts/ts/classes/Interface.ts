import { $ } from '../utils.js';
import Game from './Game.js';

export default class Interface {
    /** Instance de Game */
    private _game: Game;
    /** Element affichant le montant d'or */
    private _playerGoldElement: HTMLElement;
    /** Element affichant le nombre de vies */
    private _playerLifeElement: HTMLElement;
    /** Element affichant le statut des vagues */
    private _waveNumberElement: HTMLElement;
    /** Element pour modifier l'état du jeu */
    private _btnStartWaveElement: HTMLButtonElement;
    /** Montant d'or */
    private _playerGold: number;
    /** Nombre de vies */
    private _playerLife: number;
    /** Numéro de la vague en cours */
    private _waveNumber: number;
    /** Nombre maximum de vagues de la carte en cours */
    private _waveMax: string;

    constructor(game: Game, player?: TJsonPlayer, waveMax?: number) {
        this._game = game;
        this._playerGoldElement = $('#playerGold');
        this._playerLifeElement = $('#playerLife');
        this._waveNumberElement = $('#waveNumber');
        this._btnStartWaveElement = $('#startWave') as HTMLButtonElement;
        this._playerGold = player?.startGold ?? 0;
        this._playerLife = player?.startLife ?? 0;
        this._waveNumber = 0;
        this._waveMax = waveMax?.toString() ?? 'XX';

        this.handleGame = this.handleGame.bind(this);
        this.setDisplay();
    }

    //=======================
    // GETTERS ET SETTERS
    //=======================

    public get playerGold() {
        return this._playerGold;
    }

    private get wave() {
        return `${this._waveNumber} / ${this._waveMax}`;
    }

    //=======================
    // METHODES
    //=======================

    /** Met à jour les valeurs */
    public set(player?: TJsonPlayer, waveMax?: number) {
        this._playerGold = player?.startGold ?? 0;
        this._playerLife = player?.startLife ?? 0;
        this._waveMax = waveMax?.toString() ?? 'XX';

        this.setDisplay();
    }

    /** Met à jour l'affichage */
    private setDisplay() {
        this._playerGoldElement.innerText = this._playerGold.toString();
        this._playerLifeElement.innerText = this._playerLife.toString();
        this._waveNumberElement.innerText = this.wave;
        // Le jeu est chargé, on peut donc afficher le bouton et ajouter l'event
        this._btnStartWaveElement.style.setProperty('display', 'block');
        this._btnStartWaveElement.addEventListener('click', this.handleGame);
    }

    /** Met à jour le montant d'or du joueur */
    public setGold(gold: number) {
        this.anim(this._playerGoldElement, this._playerGold, this._playerGold + gold);
        this._playerGold += gold;
    }

    /** Met à jour le nombre de vie du joueur */
    public setLife(life: number) {
        this._playerLife += life;
        this._playerLifeElement.innerText = this._playerLife.toString();
    }

    /** Met à jour le numéro de la vague en cours */
    public setWave() {
        this._waveNumber++;
        // this._waveNumber = this._game.map.currentWaveIndex;
        this._waveNumberElement.innerText = this.wave;
    }

    /** Anime la modification de valeur d'un champ pour une durée de 300ms */
    private anim(element: HTMLElement, start: number, end: number) {
        const duration = 300;
        const delai = Math.floor(duration / Math.abs(start - end));
        let timer = 0;
        const inc = start > end ? -1 : 1;
        for (let current = start; current - inc !== end; current += inc) {
            setTimeout(() => {
                element.innerText = current.toString();
            }, (timer += delai));
        }
    }

    /** Event du bouton de l'état du jeu */
    private handleGame() {
        this._game.setPlaying();
        this._btnStartWaveElement.textContent = this._game.isPlaying ? 'Pause' : 'Lecture';
    }
}
