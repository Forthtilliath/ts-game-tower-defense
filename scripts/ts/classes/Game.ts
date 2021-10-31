import utils, { $ } from '../utils.js';
import Map from './Map.js';

class Game {
    private currentMap: Map | undefined;
    private datas: any;
    private isPlaying: boolean;
    private timestamp: number;
    private animFrameId: number;

    // Utilisation de return async/await pour être capable d'utiliser await dans le constructeur
    private constructor() {
        /** Carte à laquelle le joueur joue */
        this.currentMap = undefined;
        /** Jeu en mode play ou non */
        this.isPlaying = false;
        // TODO Remove later
        this.isPlaying = true;

        /** Timer de la partie. Un timestamp de 1 correspond à 1 seconde. */
        this.timestamp = 0;
        /** Id de l'animation pour être capable de la supprimer par la suite */
        this.animFrameId = 0;

        return this;
    }

    public static CreateAsync = async () => {
        const theGame = new Game();
        /** Toute les données contenues dans le json */
        theGame.datas = await utils.loadJson('../json/datas.json');
        return theGame;
    };

    /**
     * Charge la carte choisit par le joueur
     */
    loadMap(mapId: number) {
        /** Instancie la carte à partir des données du json */
        this.currentMap = new Map({
            element: $('#map') as HTMLDivElement,
            tiles: utils.mergeArrays(this.datas.map[mapId].tiles),
            nbTiles: this.datas.map[mapId].nbTiles,
            waves: utils.getContentByIds(this.datas.map[mapId].waves, this.datas.waves),
            jsonMonsters: this.datas.monsters,
            jsonMapRoutes: this.datas.map[mapId].routes,
            game: this,
        });

        this.currentMap.generateDom();
    }

    play() {
        this.currentMap!.nextWave();
        this.update();
    }

    stop() {
        cancelAnimationFrame(this.animFrameId);
    }

    updateStates() {
        this.currentMap!.updateStates(this.timestamp);
    }

    update() {
        this.animFrameId = requestAnimationFrame(() => this.update());

        // Incrémente le timestamp afin de pouvoir manipuler plus facilement les vitesses de
        // déplacement des éléments
        this.timestamp += 1;

        this.updateStates();

        // Test du mode pause
        if (this.timestamp === 50) {
            // Met en pause
            console.log('Pause activée');
            this.stop();

            // Remet en lecture
            setTimeout(() => {
                console.log('Lecture activée');
                this.update();
            }, 3000);
        }
    }
}

// export default new Promise(() => new Game());
export default Game.CreateAsync();
