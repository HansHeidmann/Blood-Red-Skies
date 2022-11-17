let instance = null; // Singleton Pattern

export default class ViewController {

    active = 'menu';
    #elems = {};

    constructor() {

        if(!instance) {
            instance = this; // Singleton Pattern
        }

        this.#elems.title = document.getElementById('menu-view');
        this.#elems.leaderboard = document.getElementById('leaderboard-view');
        this.#elems.game = document.getElementById('game-view');
        this.#elems.dead = document.getElementById('gameover-view');

        return instance; // Singleton Pattern
    }

    switchView(name) {
        this.active = name;
        for(let key in this.#elems) {
            this.#elems[key].style.display = 'none';
        }
        this.#elems[name].style.display = null;
    }
    

}