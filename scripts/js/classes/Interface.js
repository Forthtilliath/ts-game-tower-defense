import { $ } from '../utils.js';
export default class Interface {
    constructor(game, player, waveMax) {
        this._game = game;
        this._playerGoldElement = $('#playerGold');
        this._playerLifeElement = $('#playerLife');
        this._waveNumberElement = $('#waveNumber');
        this._btnStartWaveElement = $('#startWave');
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
    get playerGold() {
        return this._playerGold;
    }
    get wave() {
        return `${this._waveNumber} / ${this._waveMax}`;
    }
    //=======================
    // METHODES
    //=======================
    /** Met à jour les valeurs */
    set(player, waveMax) {
        this._playerGold = player?.startGold ?? 0;
        this._playerLife = player?.startLife ?? 0;
        this._waveMax = waveMax?.toString() ?? 'XX';
        this.setDisplay();
    }
    /** Met à jour l'affichage */
    setDisplay() {
        this._playerGoldElement.innerText = this._playerGold.toString();
        this._playerLifeElement.innerText = this._playerLife.toString();
        this._waveNumberElement.innerText = this.wave;
        // Le jeu est chargé, on peut donc afficher le bouton et ajouter l'event
        this._btnStartWaveElement.style.setProperty('display', 'block');
        this._btnStartWaveElement.addEventListener('click', this.handleGame);
    }
    /** Met à jour le montant d'or du joueur */
    setGold(gold) {
        this.anim(this._playerGoldElement, this._playerGold, this._playerGold + gold);
        this._playerGold += gold;
    }
    /** Met à jour le nombre de vie du joueur */
    setLife(life) {
        this._playerLife += life;
        this._playerLifeElement.innerText = this._playerLife.toString();
    }
    /** Met à jour le numéro de la vague en cours */
    setWave() {
        this._waveNumber++;
        // this._waveNumber = this._game.map.currentWaveIndex;
        this._waveNumberElement.innerText = this.wave;
    }
    /** Anime la modification de valeur d'un champ pour une durée de 300ms */
    anim(element, start, end) {
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
    handleGame() {
        this._game.setPlaying();
        this._btnStartWaveElement.textContent = this._game.isPlaying ? 'Pause' : 'Lecture';
    }
}
