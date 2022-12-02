export default class MenuView {

    
    viewController;

    playButton;
    leaderboardButton;

    constructor(viewController) {
        this.viewController = viewController;

        this.playButton = document.getElementById('play-button');
        this.playButton.onclick = this.gotoGameView.bind(this);

        this.leaderboardButton = document.getElementById('leaderboards-button');
        this.leaderboardButton.onclick = this.gotoLeaderboardView.bind(this);

    }

    gotoGameView() {
        this.viewController.switchView('game');
    }

    gotoLeaderboardView() {
        console.log("trying..");
        this.viewController.switchView('leaderboard');
    }

    load() {
        console.log("loading menu view...")
    }

    unload() {
        //
    }

}