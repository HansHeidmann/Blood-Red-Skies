class Ground {
    
    gameView;

    width;
    height; 

    img;
    sprite;

    playerMoveSpeed;


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

        this.playerMoveSpeed = gameView.moveSpeed;

    }
    
    move(w, a, s, d) {
        if((w && a) || (a && s) || (s && d) || (d && w)) {
            this.sprite.y += w * this.playerMoveSpeed * Math.sqrt(2)/2;
            this.sprite.y -= s * this.playerMoveSpeed * Math.sqrt(2)/2;
            this.sprite.x += a * this.playerMoveSpeed * Math.sqrt(2)/2;
            this.sprite.x -= d * this.playerMoveSpeed * Math.sqrt(2)/2;
        } else {
            this.sprite.y += w * this.playerMoveSpeed;
            this.sprite.y -= s * this.playerMoveSpeed;
            this.sprite.x += a * this.playerMoveSpeed;
            this.sprite.x -= d * this.playerMoveSpeed;
        }
    }

    


    
   
    
}

export { Ground }