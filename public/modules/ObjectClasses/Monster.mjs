class Monster {
    
    gameView;

    width;
    height; 
    radius;

    
    // animationFrames;
    // animationFrameLength;
    // animationLength;
    // animationFrame;
    // animationFrameTimer;
    // sprites;

    frames;
    sprite;

    img;
    tintImg;
    tintSprite;

    dead;

    health;
    speed;
    attackingRunSpeed;
    waitingToMove;
    targettingPlayer;
    targettingDistance;
    maxWanderingDistance;

    attackSpeed;
    canAttack;

    player;


    constructor(gameView) {

        // ref to view
        this.gameView = gameView;

        // player ref
        this.player = gameView.player.sprite;
        
        // Sprite Initialization
        
        //this.sprite = PIXI.Sprite.from(this.img);
        //this.sprite.anchor.set(0.5);
        // this.animationFrames = 8;
        // this.animationFrameLength = 5;
        // this.animationLength = this.animationFrames * this.animationFrameLength;
        // this.animationFrame = 0;
        // this.animationFrameTimer = 0;

        // this.sprites = [
        //     PIXI.Sprite.from("../../img/GameView/vampire/vampire_standing.png"),
        //     PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_1.png"),
        //     PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_2.png"),
        //     PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_1.png"),
        //     PIXI.Sprite.from("../../img/GameView/vampire/vampire_standing.png"),
        //     PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_3.png"),
        //     PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_4.png"),
        //     PIXI.Sprite.from("../../img/GameView/vampire/vampire_walk_3.png")
        // ];
        //
        //this.sprite = this.sprites[0];

        this.frames = [
            "../../img/GameView/vampire/vampire_standing.png",
            "../../img/GameView/vampire/vampire_walk_1.png",
            "../../img/GameView/vampire/vampire_walk_2.png",
            "../../img/GameView/vampire/vampire_walk_1.png",
            "../../img/GameView/vampire/vampire_standing.png",
            "../../img/GameView/vampire/vampire_walk_3.png",
            "../../img/GameView/vampire/vampire_walk_4.png",
            "../../img/GameView/vampire/vampire_walk_3.png"
        ];

        this.sprite = PIXI.AnimatedSprite.fromFrames(this.frames);
        this.sprite.animationSpeed = 1/6;                  // 6 fps
        //this.sprite.position.set(0,0); // almost bottom-left corner of the canvas
        
        // Width and Height
        let size = 60;
        this.sprite.width = size;
        this.sprite.height = size;
        console.log(this.sprite.width + " " + this.sprite.height);
        //this.sprite.updateAnchor = true; 
        this.sprite.play();
        this.sprite.anchor.set(0.5);

        gameView.monstersLayer.addChild(this.sprite);
        this.sprite.displayGroup = gameView.monstersLayer;
        
        

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
        this.tintSprite.tint = "16711680";
        gameView.monstersTintLayer.addChild(this.tintSprite); // add tint-sprite to gameView

         // Movement prep, Start out alive and wandering
         this.speed = .8;
         this.radius = 25;
         this.attackingRunSpeed = 1.8;
         this.targettingDistance = 222;
         this.attackSpeed = 300;
         this.maxWanderingDistance = 430;
         this.respawn();
    }

    respawn() {
        this.dead = false;
        this.health = 100; 
        this.waitingToMove = false;
        this.targettingPlayer = false;
        this.canAttack = true;
        this.tintSprite.alpha = 0; // reset damage indicator (red tint)
        this.sprite.rotation = Math.random() * 2*Math.PI; // start out facing random direction
        (Math.floor(Math.random()*10) == 0) ? this.targettingPlayer = true : this.targettingPlayer = false;
        this.setPosition();
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

    move() {
        this.animate();
        if(!this.waitingToMove) {
            if (this.targettingPlayer) {
                // rotate towards player
                this.rotateTowards(this.player);
                // move forward
                let randomSpeedVariance = Math.random()*1;
                this.sprite.x += Math.cos(this.sprite.rotation-Math.PI/2) * this.attackingRunSpeed + randomSpeedVariance;
                this.sprite.y += Math.sin(this.sprite.rotation-Math.PI/2) * this.attackingRunSpeed + randomSpeedVariance;
    
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
                
                } else if (this.distanceTo(this.player) > this.maxWanderingDistance + 100) {
                    // stop targetting but head in general direction of player
                    this.targettingPlayer = false;
                    // rotate towards player
                    this.rotateTowards(this.player);
                    // move forward
                    this.sprite.x += Math.cos(this.sprite.rotation-Math.PI/2) * this.attackingRunSpeed;
                    this.sprite.y += Math.sin(this.sprite.rotation-Math.PI/2) * this.attackingRunSpeed;
                    
                } else {
                    //this.sprite.rotation += (-Math.PI/5 + Math.random()*Math.PI/5);
                    // move forward
                    this.sprite.x += Math.cos(this.sprite.rotation-Math.PI/2) * this.attackingRunSpeed;
                    this.sprite.y += Math.sin(this.sprite.rotation-Math.PI/2) * this.attackingRunSpeed;
                }
    
            }
        }
        

        // copy and update tintSprite's location, rotation 
        this.tintSprite.rotation = this.sprite.rotation;
        this.tintSprite.x = this.sprite.x;
        this.tintSprite.y = this.sprite.y;
        
    }

    animate() {
        // this.animationFrame = Math.floor(this.animationFrames * this.animationFrameTimer/this.animationLength); //get frame #
        // // debug - animation frame tracking
        // //console.log(this.animationFrameTimer);
        // //console.log(this.animationFrame);
        
        // let x = this.sprite.x;
        // let y = this.sprite.y;
        // let w = this.sprite.width;
        // let h = this.sprite.height;
        // let r = this.sprite.rotation;
        // let a = this.sprite.anchor;

        // this.gameView.monstersLayer.removeChild(this.sprite)
        
        // this.sprite = this.sprites[this.animationFrame];
        // this.sprite.x = x;
        // this.sprite.y = y;
        // this.sprite.width = w;
        // this.sprite.height = h;
        // this.sprite.rotation = r;
        // this.sprite.anchor.set(0.5);
        
        // this.gameView.monstersLayer.addChild(this.sprite)
    
        // this.animationFrameTimer++;
        // if (this.animationFrameTimer == this.animationLength) {
        //     this.animationFrameTimer = 0;
        // }
    }

    hitTest(x, y) {
        let distX = x - this.sprite.x;
        let distY = y - this.sprite.y;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );
        // if the distance is less than the circle's
        // radius the point is inside!
        if (distance <= 25) {
          return true;
        }
        return false;
    }

    hitTestCircle(object) {
        let objectX = object.sprite.x;
        let objectY = object.sprite.y;
        let objectRadius = object.radius;
        let distX = objectX - this.sprite.x;
        let distY = objectY - this.sprite.y;
        let radiusSum = objectRadius + this.radius;
        return Math.hypot(distX, distY) <= radiusSum;
    }

    waitToMove(time) {
        //console.log("waiting");
        if (!this.waitingToMove) {
            this.waitingToMove = true;
            setTimeout(this.stopWaiting, time, this);
        }
        
    }

    stopWaiting(parent) {
        parent.waitingToMove = false;
    }

    takeDamage(amount) {
        this.health -= amount; //;
        this.health <= 0 ? this.die() : this.tintSprite.alpha = (100-this.health)/100;
        // target player
        this.targettingPlayer = true;
    }

    die() {
        console.log("monster died!");
        this.gameView.increaseScore(100);
        this.respawn();
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
    attack(player) {
        if (this.canAttack) {
            player.takeDamage();
            let timeOut = setTimeout(this.readyToAttack, this.attackSpeed, this);
            this.canAttack = false;
        }
    }

    readyToAttack(parent) {
        parent.canAttack = true;
    }
    
   
    
}

export { Monster }