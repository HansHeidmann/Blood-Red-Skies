class Monster {
    
    gameView;

    width;
    height; 

    img;
    sprite;
    tintImg;
    tintSprite;

    speed;
    direction;

    playerMoveSpeed;

    constructor(gameView) {

        this.gameView = gameView;
        
        // Sprite Initialization
        this.img = "../../img/GameView/vampire/vampire_standing.png";
        this.sprite = PIXI.Sprite.from(this.img);
        this.sprite.anchor.set(0.5);
        
        // X, Y position and Z layer
        this.sprite.x = Math.random()*gameView.game.screen.width;
        this.sprite.y = Math.random()*gameView.game.screen.height;
        this.sprite.displayGroup = gameView.monstersLayer;
        
        // Width and Height
        let size = 40;
        this.sprite.width = size;
        this.sprite.height = size;

        // Movement prep
        this.speed = 1;
        this.sprite.rotation = Math.random()*3.14;
        this.playerMoveSpeed = gameView.moveSpeed;

        // Duplicate Sprite for Red Tinting when Hit
        this.tintImg = "../../img/GameView/vampire/vampire_standing.png";
        this.tintSprite = PIXI.Sprite.from(this.img);
        this.tintSprite.anchor.set(0.5);
        this.tintSprite.x = this.sprite.x;
        this.tintSprite.y = this.sprite.y;
        this.tintSprite.displayGroup = gameView.monstersLayer;
        this.tintSprite.width = size;
        this.tintSprite.height = size;
        this.tintSprite.rotation = this.sprite.rotation;
        this.tintSprite.alpha = 0;
        this.tintSprite.tint = 16711680;

        // add sprite to gameView
        gameView.monstersLayer.addChild(this.sprite);
        gameView.monstersTintLayer.addChild(this.tintSprite);
    }


    move(w,a,s,d) {
        this.sprite.x += Math.cos(this.sprite.rotation-Math.PI/2) * this.speed;
        this.sprite.y += Math.sin(this.sprite.rotation-Math.PI/2) * this.speed;
        
        // randomize movement slightly
        let chance = Math.floor(Math.random()*5);
        if (chance == 0) {
            this.sprite.rotation += (-Math.PI/16 + Math.random()*Math.PI/8);
        }

        // simulate player movement
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

        // copy location and rotation for tintSprite
        this.tintSprite.rotation = this.sprite.rotation;
        this.tintSprite.x = this.sprite.x;
        this.tintSprite.y = this.sprite.y;


        // for testing

        if(this.sprite.y < 0) {
            this.sprite.y = 600;
        }
        if(this.sprite.y > 600) {
            this.sprite.y = 0;
        }
        if(this.sprite.x < 0) {
            this.sprite.x = 600;
        }
        if(this.sprite.x > 600) {
            this.sprite.x = 0;
        }
    }


    hitTest(bulletX, bulletY) {
        
        let distX = bulletX - this.sprite.x;
        let distY = bulletY - this.sprite.y;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );
      
        // if the distance is less than the circle's
        // radius the point is inside!
        if (distance <= 25) {
          return true;
        }
        return false;

    }
    
   
    
}

export { Monster }