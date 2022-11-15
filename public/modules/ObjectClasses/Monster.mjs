class Monster {
    
    gameView;

    width;
    height; 

    img;
    sprite;

    speed;
    direction;

    playerMoveSpeed;

    constructor(gameView) {

        this.gameView = gameView;
        
        // Sprite Initialization
        this.img = "../../img/GameView/vampire/vampire_standing.png";
        this.sprite = PIXI.Sprite.from(this.img);
        this.sprite.anchor.set(0.5);
        
        // X and Y position
        this.sprite.x = Math.random()*gameView.game.screen.width;
        this.sprite.y = Math.random()*gameView.game.screen.height;
        this.sprite.displayGroup = gameView.monstersLayer;

        
        // Width and Height
        this.sprite.width = 100;
        this.sprite.height = 100;

        // set move Speed
        this.speed = 1;
        this.sprite.rotation = Math.random()*3.14;

        this.playerMoveSpeed = gameView.moveSpeed;

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