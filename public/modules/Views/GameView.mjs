import { KeyboardHandler } from '../ObjectClasses/KeyboardHandler.mjs';
import { Player } from '../ObjectClasses/Player.mjs';
import { Monster } from '../ObjectClasses/Monster.mjs';
import { Bullet } from '../ObjectClasses/Bullet.mjs';
import { Map } from '../ObjectClasses/Map.mjs';

export default class GameView {

    width; // game width
    height; // game height

    gameOver; // Boolean for whether game has ended or not
            
    frame; // frame number, for keeping track of time
    frameRate; // game run speed
    loopTimeoutId; 

    keyboardHandler;

    game; // to store PIXI instance

    ground;
    player;
    tempBullet;
    bullets;
    powerups;
    monsters;


    constructor(viewController) {

        this.width = document.getElementById("game-container").offsetWidth;
        this.height = document.getElementById("game-container").offsetHeight;

        this.frame = 0;
        this.gameOver = false;
        
        this.frameRate = 60; // 60 frames per second

        this.game = new PIXI.Application({
            width: this.width,
            height: this.height,
            background: '#707070'
        });
        document.getElementById("game-view").appendChild(this.game.view);

        // start main GAME LOOP
        this.game.ticker.add((delta) => this.loop());
    }

    // load the game - positions objects and draws their sprites in canvas
    load() {

        // init keyboard handler
        this.keyboardHandler = new KeyboardHandler(this);
        
        // add ground
        this.ground = new Map(this);
        this.game.stage.addChild(this.ground.sprite);

        // add player
        this.player = new Player(this);
        this.game.stage.addChild(this.player.sprite);

        // add monster
        this.monsters = [];
        this.monsters[0] = new Monster(this);
        this.game.stage.addChild(this.monsters[0].sprite);

        // listen for mouse clicks to shoot()
        this.shoot(this);

        this.bullets = [];
        // start the loop
        this.loop();
       
    }

    

    
    loop() {

        // Bullet(s) 
        for (let i=0; i<this.bullets.length; i++) {
            // Move all Bullets in bulletsArray
            this.bullets[i].move();
            // Check to see if Bullet hit a Monster
        }

        // Monster(s) 
        for (let i=0; i<this.monsters.length; i++) {
            // Move all Bullets in bulletsArray
            this.monsters[i].move();
            // Check to see if Bullet hit a Monster
        }


        this.frame++;
        //console.log("main loop iteration " + this.frame);

        
        // if gameOver == false --> run loop() again : else --> GAMEOVER
        !this.gameOver ? this.loopTimeoutId = setTimeout(this.loop.bind(this), 1000/this.frameRate) : console.log("GAME OVER");
            
    }
    

    shoot(parent) {
        document.getElementById('game-view').onmousedown = function shootEvent(event) {
            // grab the vars from player to orient/positiion a new bullet
            let shootDirection = parent.player.mouseAngle;
            let gunLength = parent.player.gunLength
            // create a Bullet instance and push it to the bulletsArray
            var tempBullet = new Bullet(parent, shootDirection, gunLength);
            parent.bullets.push(tempBullet);
            // add the bullet sprite to the game stage
            parent.game.stage.addChild(tempBullet.sprite);
        }
    }
   
    

}
