const TYPE_COMMON = 0;
const TYPE_RARE = 1;
const TYPE_ELITE = 2;
const TYPE_BOSS = 3;
const TypeMonster = {
    0: 'Commom',
    1: 'Rare',
    2: 'Elite',
    3: 'Boss',
};
export default class Monster {
    constructor({ id, name, life, movement, damages, flying, gold, type }) {
        this.id = id;
        this.name = name;
        this.life = life;
        this.movement = movement;
        this.flying = flying;
        this.gold = gold;
        this.damages = damages;
        this.type = type;
        this.element = this.createElement();
        this.route = [];
        this.wave = undefined;
        this.container = document.querySelector('#monsters');
    }
    createElement() {
        const div = document.createElement('div');
        div.classList.add('monster');
        return div;
    }
    createEvents() {
    }
    initialPosition() {
        const rectTile = this.wave.map.arrTiles[this.route[0]].element.getBoundingClientRect();
        const style = {
            left: rectTile.x + 'px',
            top: rectTile.y + 'px',
            width: rectTile.width + 'px',
            height: rectTile.height + 'px',
        };
        Object.assign(this.element.style, style);
        this.container.appendChild(this.element);
        this.createEvents();
    }
    setPosition() {
        const rect = this.element.getBoundingClientRect();
        this.element.style.setProperty('top', rect.y + 5 + 'px');
        if (rect.y > 666) {
            console.log('Vague', this.wave.waveNumber, 'Disparition du monstre', this);
            this.wave.arrMonstersInMap = this.wave.arrMonstersInMap.filter((monster) => monster.element !== this.element);
            this.element.remove();
            if (!(this.wave.arrMonstersInMap.length + this.wave.arrPopMonsters.length)) {
                this.wave.map.currentWaves = this.wave.map.currentWaves.filter((wave) => wave !== this.wave);
                console.log('Vague', this.wave.waveNumber, 'terminée !');
                if (this.wave.map.finished) {
                    this.wave.map.game.stop();
                }
            }
        }
    }
    setRoute(route) {
        this.route = route;
    }
    setWave(wave) {
        this.wave = wave;
    }
    updateStates(timestamp) {
        this.setPosition();
    }
}
