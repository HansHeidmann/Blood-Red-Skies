export default class MenuView {

    playButton;
    viewController;

    constructor(viewController) {
        this.viewController = viewController;
        this.playButton = document.getElementById('play-button');
        this.playButton.onclick = this.gotoGame.bind(this);
        // debug
        //console.log('this.viewController:');
        //console.log(this.viewController);
    }

    gotoGame() {
        this.viewController.switchView('game');
        // debug
        //console.log(this);
        //console.log("play press");
        //console.log(this.viewController);
    }

}