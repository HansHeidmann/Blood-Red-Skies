export default class MenuView {

    playButton;
    viewController;

    constructor(viewController) {
        this.viewController = viewController;
        console.log('this.viewController:');
        console.log(this.viewController);
        this.playButton = document.getElementById('play-button');
        this.playButton.onclick = this.gotoGame.bind(this);
    }

    gotoGame() {

        console.log(this);

        console.log("play press");
        console.log(this.viewController);


        this.viewController.goto('game');
    }

}