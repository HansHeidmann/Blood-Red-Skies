export default class GameOverView {
    
    viewController;

    retryButton;
    postButton;

    scoreText;
    highScoreText;

    constructor(viewController) {
        this.viewController = viewController;

        // score texts
        this.scoreText = document.getElementById('score-text');
        this.highscoreText = document.getElementById('highscore-text');

        // retry button
        this.retryButton = document.getElementById('retry-button');
        this.retryButton.onclick = this.gotoGameView.bind(this);

        // post button
        this.postButton = document.getElementById('post-button');
        this.postButton.onclick = this.gotoSubmitView.bind(this);
    
    }

    load() {
        this.scoreText.innerHTML = "SCORE: " + this.viewController.game.score;
        this.highscoreText.innerHTML = "HIGHSCORE: " + this.viewController.game.highscore;
    }

    gotoGameView() {
        this.viewController.switchView('game');
    }

    gotoSubmitView() {
        this.viewController.switchView('submit');
    }


}