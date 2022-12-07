export default class MenuView {

    
    viewController;

    playButton;
    leaderboardButton;

    binaryArray;

    constructor(viewController) {
        this.viewController = viewController;

        this.playButton = document.getElementById('play-button');
        this.playButton.onclick = this.gotoGameView.bind(this);

        this.leaderboardButton = document.getElementById('leaderboards-button');
        this.leaderboardButton.onclick = this.gotoLeaderboardView.bind(this);

        this.loadingText = document.getElementById('loading-text');
        this.binaryText = document.getElementById('loading-binary');

        this.binaryArray = [];
        this.binaryArray.push("00110110 00110110 00110110");
        // for (let i=0; i<30; i++) {
        //     this.binaryArray.push(Math.floor(Math.random()*2));
        // }
        this.binaryText.innerHTML = this.binaryArray.join("");

        setTimeout(this.loadButtons, 2000, this);

    }

    gotoGameView() {
        this.viewController.switchView('game');
    }

    gotoLeaderboardView() {
        console.log("trying..");
        this.viewController.switchView('leaderboard');
    }

    loadButtons(parent) {
        parent.binaryText.style.display = "none";
        parent.loadingText.style.display = "none";

        parent.playButton.style.display = null;
        parent.leaderboardButton.style.display = null;
    }

    load() {
        console.log("loading menu view...")
    }

    unload() {
        //
    }

}