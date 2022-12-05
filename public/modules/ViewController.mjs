import MenuView from '../modules/Views/MenuView.mjs';
import GameView from '../modules/Views/GameView.mjs';
import GameOverView from '../modules/Views/GameOverView.mjs';
import LeaderboardView from '../modules/Views/LeaderboardView.mjs';
import SubmitView from './Views/SubmitView.mjs';

//import FirebaseManager from './FirebaseManager.mjs';


let instance = null; // Singleton Pattern

export default class ViewController {

    active = 'menu';
    #elems = {};
    #views = {};

    FBManager;

    constructor() {

        if(!instance) {
            instance = this; // Singleton Pattern
        }

        this.#elems.menu = document.getElementById('menu-view');
        this.#elems.game = document.getElementById('game-view');
        this.#elems.gameOver = document.getElementById('gameover-view');
        this.#elems.submit = document.getElementById('submit-view');
        this.#elems.leaderboard = document.getElementById('leaderboard-view');


        this.menu = new MenuView(this);
        this.game = new GameView(this);
        this.gameOver = new GameOverView(this);
        this.leaderboard = new LeaderboardView(this);
        this.submit = new SubmitView(this);

        this.#views.menu = this.menu;
        this.#views.game = this.game;
        this.#views.gameOver = this.gameOver;
        this.#views.leaderboard = this.leaderboard;
        this.#views.submit = this.submit;

        return instance; // Singleton Pattern

        
    }

    switchView(name) {
        this.active = name;
        for(let key in this.#elems) {
            this.#elems[key].style.display = 'none';
        }
        this.#elems[name].style.display = null;

        // for(let key in this.#views) {
        //     this.#views[key].unload();
        // }
        this.#views[name].load();
    }
    

}