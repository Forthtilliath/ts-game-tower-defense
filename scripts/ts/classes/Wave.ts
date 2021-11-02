import Monster from './Monster.js';
import utils from '../utils.js';
import C from '../constants.js';
import Map from './Map.js';

/**
 * La classe Wave gère l'ensemble de la vague.
 *
 * + generatePopMonsters() : Génère un tableau contenant l'ensemble des monstres de la vague.
 * + createEvents() : Génère les évènements de la vague
 * + launchWave() : Démarre la vague.
 */
export default class Wave {
    /** Permet d'accéder facilement à l'instance de Map pour la route */
    map: Map;
    /** Numéro de la vague */
    waveNumber: number;
    /** Id de la vague */
    id?: number;
    /** Tableau des monstres de la vague */
    monsters?: TJsonWaveMonster[];
    /** Difficulté de la vague. Plus la valeur est élevée, plus la vague est complexe. */
    difficulty?: number;
    /** Or gagné par le joueur à la fin de la vague */
    gold?: number;
    /** Tableau des objects des monstres */
    jsonMonsters: TJsonMonster[];
    /** Contient l'ensemble des monstres de la vague. */
    arrPopMonsters: Monster[];
    /** Tableau contenant l'ensemble des monstres présent sur la map */
    arrMonstersInMap: Monster[];
    /** Délai avant le lancement automatique de la vague suivante */
    delaiBeforeNextWave: number;
    /**
     * Enregistre le setTimeout de la vague suivante. Cela permet d'éviter
     * de lancer plusieurs setTimeout entre la fin d'une vague et le début
     * de la suivante.
     */
    timeout: number;

    // constructor({ id, monsters, gold, difficulty, jsonMonsters, map, waveNumber }: TWave) {
    constructor({ map }: {map:Map}) {
        this.map = map;

        this.waveNumber = map.currentWaveIndex;

        // Récupère les données de la vague dans le json
        const wave = map.game.json.getWave(this.waveNumber);
        if (wave) {
            this.id = wave.id;
            this.monsters = wave.monsters;
            this.gold = wave.gold;
            this.id = wave.id;
        }

        this.jsonMonsters = map.game.json.monsters;

        this.arrPopMonsters = this.generatePopMonsters();
        C.LOG_WAVE && console.log(this.arrPopMonsters);

        this.arrMonstersInMap = [];

        this.delaiBeforeNextWave = C.WAVE_DELAI * 1000;
        this.timeout = 0;
    }

    /**
     * Génère un tableau contenant l'ensemble des monstres de la vague. Si le monstre A doit
     * apparaitre 3 fois dans la vague, alors, il est 3 fois dans le tableau.
     *
     * Les propriétés de l'élément monsters du json ont le même nom que les attributs de la
     * classe Monster, ce qui permet d'instancier un Monster directement à partir des données
     * du json !
     *
     * L'utilisation du reverse sur le tableau permet que lorsque l'on ajoutera les monstres
     * sur la map, on pourra supprimer à partir du dernier élément plutot que le premier.
     * Ca simplifiera son utilisation.
     */
    generatePopMonsters(): Monster[] {
        if (!this.monsters) return [];

        // Fusionne les différents monstres en un seul tableau
        return (
            this.monsters.reduce(
                    (arr: Monster[], monster: TJsonWaveMonster) => [
                        ...arr,
                        ...Array.from(
                            { length: monster.quantity },
                            () => new Monster(utils.getContentById(monster.idMonster, this.jsonMonsters)),
                        ),
                    ],
                    [],
                )
            // On inverse l'ordre du tableau
            .reverse()
        );
    }

    /**
     * Génère les évènements de la vague
     */
    createEvents() {
        this.popMonster();
    }

    /**
     * Démarre la vague
     */
    popMonster() {
        // S'il reste des monstres de la vague à lancer sur la carte
        if (this.arrPopMonsters.length) {
            // Récupère le premier monstre du tableau d'apparition
            const monster = this.arrPopMonsters.pop();

            C.LOG_WAVE && console.log('Vague', this.id, 'Apparition du monstre', monster);
            // Met à jour la route du monstre
            // NOTE : Actuellement, on considère qu'il n'y a qu'une route
            // Pas la suite, il faudra soit faire une wave par route, soit répartir
            // les monstres à travers les différentes routes
            monster?.setRoute(this.map.getRoutes()[0]);
            // Met à jour la wave du monstre (permet d'avoir accès aux infos de la
            // wave et de la map directement dans le monstre)
            monster?.setWave(this);
            // Démarre son mouvement en le placant sur la carte
            monster?.initialPosition();

            monster && this.arrMonstersInMap.push(monster);
        } else if (!this.timeout) {
            // Wave terminée !
            this.timeout = setTimeout(() => {
                this.map.nextWave();
            }, this.delaiBeforeNextWave);
        }
    }

    updateStates(timestamp: number) {
        if (timestamp % (C.MONSTER_DELAI * 60) === 0) {
            this.popMonster();
        }
        this.arrMonstersInMap.forEach((monster) => monster.updateStates(timestamp));
    }
}
