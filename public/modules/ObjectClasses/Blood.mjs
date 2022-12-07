class Blood {
    
    width;
    height; 

    img;
    sprite;

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

    }

    fade() {
        // slightly reduce visibility 
        this.sprite.alpha -= .001;
    }
    
   
    
}

export { Blood }