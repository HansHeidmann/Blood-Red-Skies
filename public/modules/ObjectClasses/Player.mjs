class Player {
    
    gameView;

    x;
    y;
    width;
    height;
    radius; 

    img;
    sprites;
    sprite;

    mouseAngle;

    gunLength;


    constructor(gameView) {

        this.gameView = gameView;
        
        // Sprite Initialization
        this.sprites = {
            pistol: PIXI.Sprite.from("../../img/GameView/player_pistol.png"),
            rifle: PIXI.Sprite.from("../../img/GameView/player_rifle.png"),
            shotgun: PIXI.Sprite.from("../../img/GameView/player_shotgun.png")
        }
        this.sprite = this.sprites['pistol'];
        this.resetSpriteProperties();
        this.gameView.playerLayer.addChild(this.sprite);
        this.sprite.displayGroup = gameView.playerLayer;
        
        // Width, Height
        
        this.radius = 25;

        // start rotating the player sprite towards the mouse
        this.rotate(this.sprite, this);

        // Gun and Ammo preparations
        this.gunLength = 50;


    }

    changeGun(gunType) {
        let rotation = this.sprite.rotation;
        this.gameView.playerLayer.removeChild(this.sprite)
        this.sprite = this.sprites[gunType];
        this.resetSpriteProperties();
        this.sprite.rotation = rotation;
        this.gameView.playerLayer.addChild(this.sprite)
    }

    resetSpriteProperties() {
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.sprite.anchor.set(0.5);
        this.sprite.x = this.gameView.game.screen.width/2;
        this.sprite.y = this.gameView.game.screen.height/2;
    }
    
    rotate(sprite, parent) {
        document.getElementById('game-view').onmousemove = function clickEvent(event) {
            var gameContainer = event.target.getBoundingClientRect();
            // get current mouse x,y
            var mouseX = event.clientX - gameContainer.left;
            var mouseY = event.clientY - gameContainer.top;
            // grab player x,y
            var playerX = sprite.x;
            var playerY = sprite.y;
            // get diff between player coords and mouse coords
            var deltaX = playerX-mouseX;
            var deltaY = playerY-mouseY;
            // calculate angle
            var radians = Math.atan2(deltaX, deltaY)
            parent.mouseAngle = -radians-Math.PI/2;
            // tell player to rotate
            parent.sprite.rotation = parent.mouseAngle;
        }
    }

    takeDamage() {
        this.gameView.health -= 3;
    }





    
   
    
}

export { Player }