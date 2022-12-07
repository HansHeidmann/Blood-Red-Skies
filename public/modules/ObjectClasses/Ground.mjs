class Ground {
    
    gameView;

    width;
    height; 

    img;
    sprite;

    constructor(gameView) {
        
        this.gameView = gameView;

        // Sprite Initialization
        this.img = "../../img/GameView/ground.png";

        
        this.sprite = PIXI.Sprite.from(this.img);

        this.sprite.anchor.set(0.5);
        
        // X and Y position
        this.sprite.x = gameView.game.screen.width/2;
        this.sprite.y = gameView.game.screen.height/2;

        
        // Width and Height
        this.sprite.width = 10000;
        this.sprite.height = 10000;

    }

}

export { Ground }