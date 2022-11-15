import { KeyboardHandler } from '../ObjectClasses/KeyboardHandler.mjs';
import { Player } from '../ObjectClasses/Player.mjs';
import { Monster } from '../ObjectClasses/Monster.mjs';
import { Bullet } from '../ObjectClasses/Bullet.mjs';
import { Map } from '../ObjectClasses/Map.mjs';
import { Blood } from '../ObjectClasses/Blood.mjs';

//import { Container, Graphics, Sprite } from 'pixi.js';

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

    moveSpeed;

    groundLayer;

    constructor(viewController) {

        this.width = document.getElementById("game-container").offsetWidth;
        this.height = document.getElementById("game-container").offsetHeight;

        this.game = new PIXI.Application({
            width: this.width,
            height: this.height,
            background: '#707070'
        });
        document.getElementById("game-view").appendChild(this.game.view);

        // Z-Index Layers
        this.groundLayer = new PIXI.Container();
        this.game.stage.addChild(this.groundLayer);
        this.bloodLayer = new PIXI.Container();
        this.game.stage.addChild(this.bloodLayer);
        this.bulletsLayer = new PIXI.Container();
        this.game.stage.addChild(this.bulletsLayer);
        this.monstersLayer = new PIXI.Container();
        this.game.stage.addChild(this.monstersLayer);
        this.playerLayer = new PIXI.Container();
        this.game.stage.addChild(this.playerLayer);
        this.guiLayer = new PIXI.Container();
        this.game.stage.addChild(this.guiLayer);


        this.gameOver = false;
        this.moveSpeed = 3;

        // start main GAME LOOP
        this.game.ticker.add((delta) => this.loop());
    }

    // load the game - positions objects and draws their sprites in canvas
    load() {

        // init keyboard handler
        this.keyboardHandler = new KeyboardHandler(this);
        
        // add ground
        
        this.ground = new Map(this);
        this.groundLayer.addChild(this.ground.sprite);

        // add player
        this.player = new Player(this);
        this.playerLayer.addChild(this.player.sprite);

        // add monster
        this.monsters = [];
        this.monsters[0] = new Monster(this);
        this.monstersLayer.addChild(this.monsters[0].sprite);

        // Blood
        this.blood = [];

        // listen for mouse clicks to shoot()
        this.shoot(this);

        this.bullets = [];
        // start the loop
        //this.loop();

        
       
    }

    

    
    loop() {

        // Get current state of movement keys
        let wKey = this.keyboardHandler.wKeyDown;
        let aKey = this.keyboardHandler.aKeyDown;
        let sKey = this.keyboardHandler.sKeyDown;
        let dKey = this.keyboardHandler.dKeyDown;

        // Move ground under player
        this.ground.move(wKey, aKey, sKey, dKey);


        // Bullet(s) 
        for (let i=0; i<this.bullets.length; i++) {
            // Move all Bullets in bulletsArray
            let tempBullet = this.bullets[i];
            tempBullet.move(wKey, aKey, sKey, dKey);
            // Check to see if Bullet hit a Monster
        }

        // Monster(s) 
        for (let m=0; m<this.monsters.length; m++) {
            // Move all Bullets in bulletsArray
            let tempMonster = this.monsters[m];
            tempMonster.move(wKey, aKey, sKey, dKey);
            // Check to see if Bullet hit a Monster
            for (let b=0; b<this.bullets.length; b++) {
                let tempBulletX = this.bullets[b].sprite.x;
                let tempBulletY = this.bullets[b].sprite.y;
                if (tempMonster.hitTest(tempBulletX, tempBulletY)) {
                    //this.blood[this.blood.length] = 
                    console.log("hit!");
                    let bloodX = tempMonster.sprite.x;
                    let bloodY = tempMonster.sprite.y;
                    let tempBlood = new Blood(this, bloodX, bloodY);
                    this.blood.push(tempBlood);
                    this.bloodLayer.addChild(tempBlood.sprite);
                }
            }
        }

        // Blood
        for (let i=0; i<this.blood.length; i++) {
            // Move all Bullets in bulletsArray
            let tempBlood = this.blood[i];
            tempBlood.move(wKey, aKey, sKey, dKey);
            // fade blood as time passes
            tempBlood.sprite.alpha -= .002;
            // Remove the oldest blood whenever maxBlood blood sprites exist 
            if(this.blood.length == 300) {
                this.bloodLayer.removeChild(this.blood[0].sprite);
                this.blood[0].sprite.destroy();
                this.blood[0] = null;
                this.blood.shift();
            }
        }
        

        this.frame++;
        //console.log("main loop iteration " + this.frame);

        
        // if gameOver == false --> run loop() again : else --> GAMEOVER
        //!this.gameOver ? this.loopTimeoutId = setTimeout(this.loop.bind(this), 1000/this.frameRate) : console.log("GAME OVER");
            
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
            parent.bulletsLayer.addChild(tempBullet.sprite);
        }
    }
   
    

}
