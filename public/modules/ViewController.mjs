export default class ViewController {

    active = 'menu';
    #elems = {};
    
    app; 

    constructor() {
        this.#elems.title = document.getElementById('menu-view');
        this.#elems.leaderboard = document.getElementById('leaderboard-view');
        this.#elems.game = document.getElementById('game-view');
        this.#elems.dead = document.getElementById('gameover-view');

    }

    goto(name) {
        this.active = name;
        for(let key in this.#elems) {
            this.#elems[key].style.display = 'none';
        }
        this.#elems[name].style.display = null;
    }
    

}