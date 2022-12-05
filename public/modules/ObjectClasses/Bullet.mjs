class Bullet {
    
    width;
    height; 

    img;
    sprite;

    speed;

    constructor(gameView, direction, gunLength) {
        
        // Sprite Initialization
        this.img = "../../img/GameView/bullet.png";
        this.sprite = PIXI.Sprite.from(this.img);
        this.sprite.anchor.set(0.5);
        
        // X, Y position and Z layer
        this.sprite.rotation = direction;
        this.sprite.x = gameView.game.screen.width/2 + Math.cos(this.sprite.rotation) * gunLength;
        this.sprite.y = gameView.game.screen.height/2 + Math.sin(this.sprite.rotation) * gunLength;
        this.sprite.displayGroup = gameView.bulletsLayer;

        
        // Width and Height
        this.sprite.width = 20;
        this.sprite.height = 20;

        // set move Speed
        this.speed = 15;

    }
    

    shoot() {
        //console.log("shot!");
    }

    move() {
        this.sprite.x += Math.cos(this.sprite.rotation) * this.speed;
        this.sprite.y += Math.sin(this.sprite.rotation) * this.speed;
    }

    


    
   
    
}

export { Bullet }