class Blood {
    
    width;
    height; 

    img;
    sprite;

    playerMoveSpeed;

    constructor(gameView, x, y) {
        
        // Sprite Initialization
        this.img = "../../img/GameView/blood.png";
        this.sprite = PIXI.Sprite.from(this.img);
        this.sprite.anchor.set(0.5);
        
        // X, Y position and Z layer
        this.sprite.x = x - 10 + Math.random() * 20;
        this.sprite.y = y - 10 + Math.random() * 20;
        this.sprite.displayGroup = gameView.bloodLayer;

        // Width, Height, Rotation, Alpha
        this.sprite.width = 5 + Math.random() * 10;
        this.sprite.height = 5 + Math.random() * 10;
        this.sprite.rotation = Math.random() * (2 * Math.PI);
        this.sprite.alpha = Math.random();

        // to move blood to simulate player movement
        this.playerMoveSpeed = gameView.moveSpeed

    }

    move(w,a,s,d) {

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

    fade() {
        // slightly reduce visibility 
        this.sprite.alpha -= .001;
    }
    
   
    
}

export { Blood }