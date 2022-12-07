class Bullet {
    
    width;
    height; 

    img;
    sprite;

    type;

    constructor(gameView, direction, gunType) {
        
        this.gameView = gameView;
        // Sprite Initialization
        this.img = "../../img/GameView/bullet.png";
        this.sprite = PIXI.Sprite.from(this.img);
        this.sprite.anchor.set(0.5);
        
        // X, Y position and Z layer
        this.sprite.rotation = direction;
        
        this.sprite.displayGroup = gameView.bulletsLayer;

        this.setAttributes(gunType);

    }
   
    setAttributes(gunType) {
        this.type = gunType.type;
        this.damage = gunType.bulletDamage;
        this.speed = gunType.bulletSpeed;
        this.sprite.width = gunType.bulletSize;
        this.sprite.height = gunType.bulletSize;
        this.sprite.x = this.gameView.game.screen.width/2 + Math.cos(this.sprite.rotation) * gunType.gunLength;
        this.sprite.y = this.gameView.game.screen.height/2 + Math.sin(this.sprite.rotation) * gunType.gunLength;
    }

    move() {
        this.sprite.x += Math.cos(this.sprite.rotation) * this.speed;
        this.sprite.y += Math.sin(this.sprite.rotation) * this.speed;
    }

    


    
   
    
}

export { Bullet }