import { KeyboardHandler } from '../ObjectClasses/KeyboardHandler.mjs';
import { AudioPlayer } from '../AudioPlayer.mjs';
import { Player } from '../ObjectClasses/Player.mjs';
import { Monster } from '../ObjectClasses/Monster.mjs';
import { Bullet } from '../ObjectClasses/Bullet.mjs';
import { Ground } from '../ObjectClasses/Ground.mjs';
import { Blood } from '../ObjectClasses/Blood.mjs';
import { GUI } from '../ObjectClasses/GUI.mjs';

//import { Container, Graphics, Sprite } from 'pixi.js';

export default class GameView {

    viewController // to use MVC 

    audioPlayer; 
    soundOff;

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

    gui;

    health;
    time;
    ammo;
    score;
    highscore;
    guns;
    currentGun;
    moveSpeed;

    bulletsToRemove;


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

        // default values for global vars
        this.gameOver = false;
        this.health = 100;
        this.time = 0;
        this.score = 0;
        this.highscore = 0;
        this.moveSpeed = 3;

        // empty arrays for monsters, blood, bullets, powerups
        this.monsters = [];
        this.blood = [];
        this.bullets = [];
        this.bulletsToRemove = [];

        // empty dict for ammo
        this.ammo = {};
        this.ammo.pistol = 999;
        this.ammo.rifle = 100;
        this.ammo.shotgun = 30;

        // guns
        this.guns = ["pistol"];
        this.currentGun = this.guns[0];

        // init audio player
        this.audioPlayer = new AudioPlayer();

        // audio settings
        this.soundOff = false;
        this.musicOff = true;
        if(!this.musicOff) {
            this.audioPlayer.theme.play();
        }
        
        // listen for mouse clicks to shoot()
        this.mouseDownListener(this);

        // init keyboard handler
        this.keyboardHandler = new KeyboardHandler(this);

        // Z-Index Layers (Containers)
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
        
        // add ground
        this.ground = new Ground(this);
        this.groundLayer.addChild(this.ground.sprite);

        // add player
        this.player = new Player(this);
        this.playerLayer.addChild(this.player.sprite);

        // add gui
        this.gui = new GUI(this);
        this.guiLayer.addChild(this.gui.healthSprite);
        this.guiLayer.addChild(this.gui.timeSprite);
        this.guiLayer.addChild(this.gui.ammoSprite);
        this.guiLayer.addChild(this.gui.scoreSprite);

        
        // increment time by 1 every 1000 milliseconds
        setInterval(this.increaseTime, 1000, this);

        // main game loop ticker
        this.game.ticker.add((delta) => this.loop());

    }

    // switch to GameOver View
    gotoGameOverView() {
        this.viewController.switchView('gameOver');
    }

    // call reset() to (re)load the game 
    load() {
        console.log("loading game view...")
        this.reset();
       
    }

    stopGame() {
        // clean up monsters, blood, bullets, etc
        this.clean();
        this.gotoGameOverView();
    }

    clean() {
        console.log("GAME OVER.. cleaning up GameView");

        // clean monsters
        while (this.monsters.length > 0) {
            this.monsters[0].sprite.destroy();
            this.monsters[0].tintSprite.destroy();
            this.monstersLayer.removeChild(this.monsters[0].sprite);
            this.monstersLayer.removeChild(this.monsters[0].tintSprite);
            this.monsters[0] = null;
            this.monsters.shift();
        }

        // clean bullets
        while (this.bullets.length > 0) {
            this.bullets[0].sprite.destroy();
            this.bulletsLayer.removeChild(this.bullets[0].sprite);
            this.bullets[0] = null;
            this.bullets.shift();
        }

        // clean blood
        while (this.blood.length > 0) {
            this.blood[0].sprite.destroy();
            this.bloodLayer.removeChild(this.blood[0].sprite);
            this.blood[0] = null;
            this.blood.shift();
        }
    }

    reset() {

        this.gameOver = false;
        this.health = 100;
        this.time = 0;
        this.score = 0;

        // Blood and bullets arrays (empty)
        this.blood = [];
        this.bullets = [];

        // ammo
        this.ammo.pistol = 999;
        this.ammo.rifle = 100;
        this.ammo.shotgun = 30;

        // guns
        this.guns = ["pistol"];
        this.currentGun = this.guns[0];

        // add monsters 
        let totalMonsters = 10;
        this.monsters = [];
        for (let m=0; m<totalMonsters; m++) {
            let tempMonster = new Monster(this);
            this.monsters.push(tempMonster);
        }

        // update gui text
        this.gui.updateHealthText(this.health);
        this.gui.updateTimeText(this.time);
        this.gui.updateAmmoText(this.ammo[this.currentGun]);
        this.gui.updateScoreText(this.score);

        
    }

    
    loop() {

        if (!this.gameOver && this.viewController.active == 'game') {

            // check for game over
            if (this.health <= 0) {
                this.gameOver = true;
                this.stopGame();
            }

            // debug
            //this.health -= .8;
            // increase survival time and update gui text with values
            //this.time += 0.1;

            // update gui text
            this.gui.updateHealthText(this.health);
            

            // Get current state of movement keys
            let wKey = this.keyboardHandler.wKeyDown;
            let aKey = this.keyboardHandler.aKeyDown;
            let sKey = this.keyboardHandler.sKeyDown;
            let dKey = this.keyboardHandler.dKeyDown;

            // Move ground under player
            this.ground.move(wKey, aKey, sKey, dKey);

            // Play walking sound if walking
            if(wKey || aKey || sKey || dKey) {
                if(!this.soundOff) {
                    if(!this.audioPlayer.footsteps.playing()) {
                        this.audioPlayer.footsteps.play();
                        this.audioPlayer.footsteps.rate(1 + Math.random() * .3); // randomize pitch slightly
                    }
                }
            }

            // Bullets 
            for (let i=0; i<this.bullets.length; i++) {
                // Move all Bullets in bulletsArray
                let tempBullet = this.bullets[i];
                tempBullet.move(wKey, aKey, sKey, dKey);
            }

            // Monsters 
            for (let m=0; m<this.monsters.length; m++) {
                // Move all Monsters in monsters[] array
                let tempMonster = this.monsters[m];
                tempMonster.move(wKey, aKey, sKey, dKey);
                tempMonster.animate(this);
                
                // Add some blood below hurt monsters
                if (tempMonster.tintSprite.alpha > 0.2) {
                    let chance = Math.floor(Math.random()*(50 - (20 * tempMonster.tintSprite.alpha)));
                    if (chance == 0) {
                        let bloodX = tempMonster.sprite.x;
                        let bloodY = tempMonster.sprite.y;
                        let tempBlood = new Blood(this, bloodX, bloodY);
                        this.blood.push(tempBlood);
                        this.bloodLayer.addChild(tempBlood.sprite);
                    }
                }
                
                // Wait to walk if bumping into another monster
                for (let z=0; z<this.monsters.length; z++) {
                    let otherMonster = this.monsters[z];
                    if (otherMonster != tempMonster) {
                        if (tempMonster.hitTestCircle(otherMonster.sprite.x, otherMonster.sprite.y, 25)) {
                            if (!otherMonster.waitingToMove) {
                                //tempMonster.waitingToMove = true;
                                tempMonster.waitToMove(1000);
                            }
                        }
                        // if (!tempMonster.hitTestCircle(otherMonster.sprite.x, otherMonster.sprite.y, 25)) {
                        //     //if (!otherMonster.waitingToMove) {
                        //         otherMonster.waitingToMove = false;
                        //     //}
                        // }
                    }
                    
                }
                
                // Check to see if Bullet hit a Monster
                for (let b=0; b<this.bullets.length; b++) { // loop through all bullets
                    let tempBulletX = this.bullets[b].sprite.x; // current bullet X position
                    let tempBulletY = this.bullets[b].sprite.y; // current bullet Y position
                    if (tempMonster.hitTest(tempBulletX, tempBulletY)) { // is x,y of bullet inside monster's hit radius?
                        console.log("hit!");
                        // increase score slightly
                        this.increaseScore(5);

                        // add some blood below the monster
                        let bloodAmount = Math.floor(Math.random()*20); // NEEDS TO BE DIFFERENT FOR GUNS or based on monster damage
                        let bloodX = tempMonster.sprite.x;
                        let bloodY = tempMonster.sprite.y;
                        this.bloodSplatter(bloodAmount, bloodX, bloodY, 20, 20);
                       
                        
                        // remove the bullet change to queue with object removal function
                        this.bulletsLayer.removeChild(this.bullets[b].sprite);
                        this.bullets[b].sprite.destroy();
                        this.bullets[b] = null;
                        let index = this.bullets.indexOf(this.bullets[b]); 
                        if (index > -1) { 
                            this.bullets.splice(index, 1); // remove the object at index (i)
                        }
                        // queue the bullet for removal 
                        //bulletsToRemove.push(this.bullets[b]);
                        
                        
                        // tint hit monster slightly more red
                        //tempMonster.tintSprite.alpha += 0.05;

                        tempMonster.takeDamage();

                        if(tempMonster.health <= 0) {
                            console.log("made it here");
                        }
                        
                    }
                }

               
            }


            // Blood - fading and object cleanup
            for (let i=0; i<this.blood.length; i++) {
                // Move all Bullets in bulletsArray
                let tempBlood = this.blood[i];
                tempBlood.move(wKey, aKey, sKey, dKey);
                // fade blood as time passes
                tempBlood.fade();
                // Remove the oldest blood whenever maxBlood blood sprites exist 
                if(this.blood.length >= 1000) {
                    this.blood[0].sprite.destroy();
                    this.bloodLayer.removeChild(this.blood[0].sprite);
                    this.blood[0] = null;
                    this.blood.shift();
                }   
            }
        }

        // debug
        var bloodDiv = document.getElementById("bloodArray");
        bloodDiv.innerHTML = "monsters[].length = " + this.monsters.length + "    " + this.monstersLayer;
        
    }

    increaseTime(gameView) {
        gameView.time++;
        gameView.gui.updateTimeText(gameView.time);
    }

    increaseScore(amount) {
        this.score += amount;
        if(this.score > this.highscore) {
            this.highscore = this.score;
        }
        this.gui.updateScoreText(this.score);
    }
    

    shoot() {
        if (!this.gameOver) {
            // ifthe player has ammo for their current gun:
            if (this.ammo[this.currentGun] > 0) {
                // reduce ammo by 1
                this.ammo[this.currentGun]--;
                this.gui.updateAmmoText(this.ammo[this.currentGun]);
                // play shoot sound
                if(!this.soundOff) {
                    this.audioPlayer.gunshot.play();
                }
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
            
        }
        
    }

    bloodSplatter(amount, x, y, sprayModX, sprayModY) {
        for (let b=0; b<amount; b++) {
            let sprayX = -10 + Math.floor(Math.random()*sprayModX);
            let sprayY = -10 + Math.floor(Math.random()*sprayModY);
            let blood = new Blood(this, x + sprayX, y + sprayY);
            this.blood.push(blood);
            this.bloodLayer.addChild(blood.sprite);
        }
    }

    removeObject(target, targetArray, targetLayer) {
        targetLayer.removeChild(target.sprite);
        target.sprite.destroy();
        target = null;
        let index = targetArray.indexOf(target); 
        if (!index == -1) { 
            targetArray.splice(index, 1); // remove the object at index (i)
        }
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
