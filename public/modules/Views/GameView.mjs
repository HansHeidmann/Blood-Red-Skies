import { KeyboardHandler } from '../ObjectClasses/KeyboardHandler.mjs';
import { AudioPlayer } from '../AudioPlayer.mjs';
import { Player } from '../ObjectClasses/Player.mjs';
import { Monster } from '../ObjectClasses/Monster.mjs';
import { Bullet } from '../ObjectClasses/Bullet.mjs';
import { Ground } from '../ObjectClasses/Ground.mjs';
import { Blood } from '../ObjectClasses/Blood.mjs';

//import { Container, Graphics, Sprite } from 'pixi.js';

export default class GameView {

    viewController // to use MVC 

    audioPlayer; 

    // keyboard and mouse state handling
    keyboardHandler; 
    mouseDown;
    mouseUp;

    game; // to store PIXI instance

    width; // game width
    height; // game height

    gameOver; // Boolean for whether game has ended or not

    ground;
    player;
    bullets;
    powerups;
    monsters;

    moveSpeed;

    groundLayer;

    constructor(viewController) {

        this.viewController = viewController; // reference to MVC control panel

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
        this.monstersTintLayer = new PIXI.Container();
        this.game.stage.addChild(this.monstersTintLayer);
        this.playerLayer = new PIXI.Container();
        this.game.stage.addChild(this.playerLayer);
        this.guiLayer = new PIXI.Container();
        this.game.stage.addChild(this.guiLayer);


        this.gameOver = false;
        this.moveSpeed = 3;

        
    }

    // load the game - positions objects and draws their sprites in canvas
    load() {

        // init audio player
        this.audioPlayer = new AudioPlayer();
        //this.audioPlayer.theme.play();

        // init keyboard handler
        this.keyboardHandler = new KeyboardHandler(this);
        
        // add ground
        this.ground = new Ground(this);
        this.groundLayer.addChild(this.ground.sprite);

        // add player
        this.player = new Player(this);
        this.playerLayer.addChild(this.player.sprite);

        // add monsters 
        this.monsters = [];
        for (let m=0; m<10; m++) {
            let tempMonster = new Monster(this);
            this.monsters.push(tempMonster);
        }
        console.log(this.monsters);
        

        // Blood
        this.blood = [];

        // listen for mouse clicks to shoot()
        this.mouseDownListener(this);

        this.bullets = [];
        // start the loop
        //this.loop();

        // start main GAME LOOP
        this.game.ticker.add((delta) => this.loop());
       
    }

    

    
    loop() {

        // Get current state of movement keys
        let wKey = this.keyboardHandler.wKeyDown;
        let aKey = this.keyboardHandler.aKeyDown;
        let sKey = this.keyboardHandler.sKeyDown;
        let dKey = this.keyboardHandler.dKeyDown;

        // Move ground under player
        this.ground.move(wKey, aKey, sKey, dKey);

        // Play walking sound if walking
        if(wKey || aKey || sKey || dKey) {
            if(!this.audioPlayer.footsteps.playing()) {
                this.audioPlayer.footsteps.play();
                this.audioPlayer.footsteps.rate(1 + Math.random() * .3); // randomize pitch slightly
            }
        }

        // Bullets 
        for (let i=0; i<this.bullets.length; i++) {
            // Move all Bullets in bulletsArray
            let tempBullet = this.bullets[i];
            tempBullet.move(wKey, aKey, sKey, dKey);
            // Check to see if Bullet hit a Monster
        }

        // Monsters 
        for (let m=0; m<this.monsters.length; m++) {
            // Move all Bullets in bulletsArray
            let tempMonster = this.monsters[m];
            tempMonster.move(wKey, aKey, sKey, dKey);
            // Check to see if Bullet hit a Monster
            for (let b=0; b<this.bullets.length; b++) { // loop through all bullets
                let tempBulletX = this.bullets[b].sprite.x; // current bullet X position
                let tempBulletY = this.bullets[b].sprite.y; // current bullet Y position
                if (tempMonster.hitTest(tempBulletX, tempBulletY)) { // is x,y of bullet inside monster's hit radius?
                    console.log("hit!");
                    // tint hit monster slightly more red
                    tempMonster.tintSprite.alpha += 0.05;
                    // remove the bullet that hit the monster (object cleanup)
                    this.bulletsLayer.removeChild(this.bullets[b].sprite);
                    this.bullets[b].sprite.destroy();
                    this.bullets[b] = null;
                    let index = this.bullets.indexOf(this.bullets[b]); //
                    if (index > -1) { 
                        this.bullets.splice(index, 1); // remove the bullet at index (i)
                    }
                    // add some blood below the monster
                    let bloodAmount = Math.floor(Math.random()*20); // NEEDS TO BE DIFFERENT FOR GUNS or based on monster damage
                    let bloodX = tempMonster.sprite.x;
                    let bloodY = tempMonster.sprite.y;
                    for (let p=0; p<bloodAmount; p++) {
                        let bloodSprayDistanceX = -10 + Math.floor(Math.random()*20);
                        let bloodSprayDistanceY = -10 + Math.floor(Math.random()*20);
                        let tempBlood = new Blood(this, bloodX+bloodSprayDistanceX, bloodY+bloodSprayDistanceY);
                        this.blood.push(tempBlood);
                        this.bloodLayer.addChild(tempBlood.sprite);
                    }
                    
                }
            }
        }

        // Blood
        for (let i=0; i<this.blood.length; i++) {
            // Move all Bullets in bulletsArray
            let tempBlood = this.blood[i];
            tempBlood.move(wKey, aKey, sKey, dKey);
            // fade blood as time passes
            tempBlood.fade();
            // Remove the oldest blood whenever maxBlood blood sprites exist 
            if(this.blood.length == 500) {
                this.bloodLayer.removeChild(this.blood[0].sprite);
                this.blood[0].sprite.destroy();
                this.blood[0] = null;
                this.blood.shift();
            }
        }
        
    }
    

    

    shoot() {
        // play shoot sound
        this.audioPlayer.gunshot.play();
        //setTimeout(this.audioPlayer.play("reload"), 1000); // reload sound
        // grab the vars from player to orient/positiion a new bullet
        let shootDirection = this.player.mouseAngle;
        let gunLength = this.player.gunLength
        // create a Bullet instance and push it to the bulletsArray
        let tempBullet = new Bullet(this, shootDirection, gunLength);
        this.bullets.push(tempBullet);
        // add the bullet sprite to the game stage
        this.bulletsLayer.addChild(tempBullet.sprite);
    }

    mouseDownListener(parent) {
        document.getElementById('game-view').onmousedown = function shootEvent(event) {
           parent.shoot();
           parent.mouseDown = true;
        }
    }

    mouseUpListener(parent) {
        document.getElementById('game-view').onmousedown = function shootEvent(event) {
            parent.mouseUp = true;
        }
    }
   
    

}
