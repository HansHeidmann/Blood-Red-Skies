import { Bullet } from '../ObjectClasses/Bullet.mjs';

class Player {
    
    gameView;

    x;
    y;
    width;
    height; 

    img;
    sprite;

    mouseAngle;

    ammo;
    gunLength;


    constructor(gameView) {

        this.gameView = gameView;
        
        // Sprite Initialization
        this.img = "../../img/GameView/player.png";
        this.sprite = PIXI.Sprite.from(this.img);
        this.sprite.anchor.set(0.5);
        
        // X and Y position
        this.sprite.x = this.gameView.game.screen.width/2;
        this.sprite.y = this.gameView.game.screen.height/2;
        this.sprite.displayGroup = gameView.playerLayer;
        
        // Width and Height
        this.sprite.width = 100;
        this.sprite.height = 100;

        // start rotating the player sprite towards the mouse
        this.rotatePlayer(this.sprite, this);

        // Gun and Ammo preparations
        this.ammo = 10;
        this.gunLength = 50;


    }
    

    shoot(sprite, parent) {
       
    }

    rotatePlayer(sprite, parent) {
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




    
   
    
}

export { Player }