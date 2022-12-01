export default class MenuView {

    playButton;
    viewController;

    constructor(viewController) {
        this.viewController = viewController;
        this.playButton = document.getElementById('play-button');
        this.playButton.onclick = this.gotoGameView.bind(this);
        // debug
        //console.log('this.viewController:');
        //console.log(this.viewController);
    }

    gotoGameView() {
        this.viewController.switchView('game');
        this.viewController.game.load();
    }

}