class Monster {
    
    gameView;

    width;
    height; 


    animationFrames;
    animationFrameLength;
    animationLength;
    animationFrame;
    animationFrameTimer;

    sprites;
    sprite;

    img;
    tintImg;
    tintSprite;

    dead;

    speed;
    attackingSpeed;
    targettingPlayer;
    targettingDistance;
    maxWanderingDistance;

    player;
    playerMoveSpeed;


    constructor(gameView) {

        // ref to view
        this.gameView = gameView;

        // player ref
        this.player = gameView.player.sprite;
        this.playerMoveSpeed = gameView.moveSpeed;
        
        // Sprite Initialization
        
        //this.sprite = PIXI.Sprite.from(this.img);
        //this.sprite.anchor.set(0.5);
        this.animationFrames = 8;
        this.animationFrameLength = 5;
        this.animationLength = this.animationFrames * this.animationFrameLength;
        this.animationFrame = 0;
        this.animationFrameTimer = 0;

        this.sprites = [
            PIXI.Sprite.from("../../img/GameView/vampire/vampire_standing.png"),
            PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_1.png"),
            PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_2.png"),
            PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_1.png"),
            PIXI.Sprite.from("../../img/GameView/vampire/vampire_standing.png"),
            PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_3.png"),
            PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_4.png"),
            PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_3.png")
        ];
        this.sprite = this.sprites[0];
        this.sprite.anchor.set(0.5);
        gameView.monstersLayer.addChild(this.sprite);
        this.sprite.displayGroup = gameView.monstersLayer;
        
        // X, Y position 
        this.setPosition();
        
        
        // Width and Height
        let size = 60;
        this.sprite.width = size;
        this.sprite.height = size;

        // Movement prep, Start out alive and wandering
        this.dead = false;
        this.speed = .8;
        this.attackingSpeed = 1.5;
        this.sprite.rotation = Math.random() * 2*3.14;
        this.targettingPlayer = false;
        this.targettingDistance = 260;
        this.maxWanderingDistance = 500;

        // Duplicate Sprite for Red Tinting when Hit
        this.img = "../../img/GameView/vampire/vampire_standing.png";
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
        gameView.monstersTintLayer.addChild(this.tintSprite); // add tint-sprite to gameView
    }

    setPosition() {
        // this.sprite.x = Math.random() * this.gameView.game.screen.width;
        // this.sprite.y = Math.random() * this.gameView.game.screen.height;

        let minDistance = 400;
        let randomDistance = Math.floor(Math.random() * 1) + minDistance;
        let radians = Math.random() * (2* Math.PI);

        this.sprite.x = this.player.x + (Math.cos(radians) * randomDistance);
        this.sprite.y = this.player.y + (Math.sin(radians) * randomDistance);
    }

    move(w,a,s,d) {

        if (this.targettingPlayer) {
            // rotate towards player
            this.rotateTowards(this.player);
            // move forward
            this.sprite.x += Math.cos(this.sprite.rotation-Math.PI/2) * this.attackingSpeed;
            this.sprite.y += Math.sin(this.sprite.rotation-Math.PI/2) * this.attackingSpeed;

        } else {

            if (this.distanceTo(this.player) < this.maxWanderingDistance) {
            
                // see if player is within range to attack
                if (this.distanceTo(this.player) < this.targettingDistance) {
                    this.targettingPlayer = true;
                }

                // move forward
                this.sprite.x += Math.cos(this.sprite.rotation-Math.PI/2) * this.speed;
                this.sprite.y += Math.sin(this.sprite.rotation-Math.PI/2) * this.speed;
                
                // maybe turn a bit, randomly
                let chance = Math.floor(Math.random()*3);
                if (chance == 0) {
                    this.sprite.rotation += (-Math.PI/32 + Math.random()*Math.PI/16);
                }
            
            }

        }

        // WASD - move monsters with map and everything 
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

        // copy and update tintSprite's location, rotation 
        this.tintSprite.rotation = this.sprite.rotation;
        this.tintSprite.x = this.sprite.x;
        this.tintSprite.y = this.sprite.y;
        
    }

    animate() {
        this.animationFrame = Math.floor(this.animationFrames * this.animationFrameTimer/this.animationLength); //get frame #
        // debug - animation frame tracking
        //console.log(this.animationFrameTimer);
        //console.log(this.animationFrame);
        
        let x = this.sprite.x;
        let y = this.sprite.y;
        let w = this.sprite.width;
        let h = this.sprite.height;
        let r = this.sprite.rotation;
        let a = this.sprite.anchor;

        this.gameView.monstersLayer.removeChild(this.sprite)
        
        this.sprite = this.sprites[this.animationFrame];
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = w;
        this.sprite.height = h;
        this.sprite.rotation = r;
        this.sprite.anchor.set(0.5);
        
        this.gameView.monstersLayer.addChild(this.sprite)
        

        this.animationFrameTimer++;
        if (this.animationFrameTimer == this.animationLength) {
            this.animationFrameTimer = 0;
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

    distanceTo(otherObject) {
        let monster = this.sprite;
        let distance = Math.sqrt(Math.pow((otherObject.x - monster.x), 2) + Math.pow((otherObject.y - monster.y), 2));
        return distance;
    }

    rotateTowards(otherObject) {
        let monster = this.sprite;
        var deltaX = otherObject.x - monster.x;
        var deltaY = otherObject.y - monster.y;
        // calculate angle in rads
        var radians = Math.atan2(deltaX, deltaY)
        // rotate
        monster.rotation = -radians + Math.PI;
    }
    
   
    
}

export { Monster }