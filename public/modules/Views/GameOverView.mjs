export default class GameOverView {
    
    viewController;

    retryButton;
    postButton;

    constructor(viewController) {
        this.viewController = viewController;
        this.retryButton = document.getElementById('retry-button');
        this.retryButton.onclick = this.gotoGameView.bind(this);
        // debug
        console.log('this.viewController:');
        console.log(this.viewController);
    }

    gotoGameView() {
        console.log("trying");
        this.viewController.switchView('game');
    }
}