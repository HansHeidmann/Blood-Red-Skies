import { KeyboardHandler } from '../ObjectClasses/KeyboardHandler.mjs';
import { AudioPlayer } from '../AudioPlayer.mjs';
import { Player } from '../ObjectClasses/Player.mjs';
import { Monster } from '../ObjectClasses/Monster.mjs';
import { PistolStrategy } from '../ObjectClasses/GunStrategy/PistolStrategy.mjs';
import { RifleStrategy } from '../ObjectClasses/GunStrategy/RifleStrategy.mjs';
import { ShotgunStrategy } from '../ObjectClasses/GunStrategy/ShotgunStrategy.mjs';
import { Ground } from '../ObjectClasses/Ground.mjs';
import { Forest } from '../ObjectClasses/FoliageFlyweight/Forest.mjs';
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

    game; // to store PIXI instance

    width; // game width
    height; // game height

    gameOver; // Boolean for whether game has ended or not

    nonPlayerSprites;
    ground;
    player;
    bullets;
    powerups;
    monsters;

    gui;

    health;
    time;
    score;
    highscore;
    guns;
    currentGun;
    moveSpeed;


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
        this.canAddMonster = false;

        // empty arrays for non-player game objects
        this.nonPlayerSprites = [];
        this.monsters = [];
        this.blood = [];
        this.bullets = [];

        // guns
        this.guns = {};
        this.guns.pistol = new PistolStrategy(this);
        this.guns.rifle = new RifleStrategy(this);
        this.guns.shotgun = new ShotgunStrategy(this);

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
        this.treesLayer = new PIXI.Container();
        this.game.stage.addChild(this.treesLayer);
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

        // add forest
        this.forest = new Forest(this);

        // add player
        this.player = new Player(this);

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

        // clean forest
        for (let index in this.forest.trees) {
            this.forest.trees[index] = null;
            
        }
        this.forest.trees = []
        for (var i = this.treesLayer.children.length-1; i>= 0; i--) {	
              this.treesLayer.removeChild(this.treesLayer.children[i]);
        }

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
        this.canAddMonster = false;

        // Empty non-player gameObject arrays
        this.nonPlayerSprites = [];
        this.blood = [];
        this.bullets = [];
        this.monsters = [];

        // guns
        for (let key in this.guns) {
            this.guns[key].resetGun();
        }
        this.guns.pistol.owned = true;
        this.currentGun = this.guns.pistol;

        // add monsters 
        let totalMonsters = 5;
        for (let m=0; m<totalMonsters; m++) {
            let monster = new Monster(this);
            this.monsters.push(monster);
        }

        // add trees
        for (let t=0; t<3000; t++) {
            let x = -5000 + Math.floor(Math.random() * 10000);
            let y = -5000 + Math.floor(Math.random() * 10000);
            this.forest.plantTree(x, y, "random");
        }
        this.forest.draw(this);

        // populate non-player gameObjects array for WASD camera movement
        for (let index in this.monsters) {
            this.nonPlayerSprites.push(this.monsters[index].sprite);
        }
        this.nonPlayerSprites.push(this.ground.sprite);
        console.log(this.nonPlayerSprites);


        // update gui text
        this.gui.updateHealthText(this.health);
        this.gui.updateTimeText(this.time);
        this.gui.updateAmmoText(this.currentGun.ammo);
        this.gui.updateScoreText(this.score);

        
    }

    
    loop() {

        if (!this.gameOver && this.viewController.active == 'game') {

            // check for game over
            if (this.health <= 0) {
                this.gameOver = true;
                this.stopGame();
                return;
            }
        
            // add another monster 
            if (this.time % 5 == 0) {
                if (this.canAddMonster) {
                    let monster = new Monster(this);
                    this.monsters.push(monster);
                    this.nonPlayerSprites.push(monster.sprite);
                    this.canAddMonster = false;
                }
                
            } else {
                if (!this.canAddMonster) {
                    this.canAddMonster = true;
                }
            }

            // update gui text
            this.gui.updateHealthText(this.health);
            
            // check if Mouse Button 1 (left) is Down
            if(this.mouseDown) {
                if (this.currentGun.type == "rifle") {
                    if (this.currentGun.canShoot) {
                        console.log("machine gunning");
                        this.shoot();
                        this.currentGun.canShoot = false;
                    }
                }
            }

            // Get current state of movement keys
            let wKey = this.keyboardHandler.wKeyDown;
            let aKey = this.keyboardHandler.aKeyDown;
            let sKey = this.keyboardHandler.sKeyDown;
            let dKey = this.keyboardHandler.dKeyDown;
            let rKey = this.keyboardHandler.rKeyDown;

            

            // Check if Key Down to Reload Gun
            if(rKey) {
                console.log("r key down");
                this.currentGun.reload();
            }

            // Play walking sound if walking
            if(wKey || aKey || sKey || dKey) {
                // Move Camera
                this.moveCamera(wKey, aKey, sKey, dKey);
                //play sound
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
                tempBullet.move();
            }

            // Monsters 
            for (let m=0; m<this.monsters.length; m++) {
                // Move all Monsters in monsters[] array
                let monster = this.monsters[m];
                monster.move();

                // Did monster run into player?
                if (monster.hitTestCircle(this.player)) {
                    monster.attack(this.player);
                }
                
                // Add some blood below hurt monsters
                if (monster.tintSprite.alpha > 0.2) {
                    let chance = Math.floor(Math.random()*(50 - (20 * monster.tintSprite.alpha)));
                    if (chance == 0) {
                        let bloodX = monster.sprite.x;
                        let bloodY = monster.sprite.y;
                        let tempBlood = new Blood(this, bloodX, bloodY);
                        this.blood.push(tempBlood);
                        this.bloodLayer.addChild(tempBlood.sprite);
                        this.nonPlayerSprites.push(tempBlood.sprite);
                    }
                }
                
                // Monster waits to walk if bumping into another monster
                for (let z=0; z<this.monsters.length; z++) {
                    let otherMonster = this.monsters[z];
                    if (otherMonster != monster) {
                        if (monster.hitTestCircle(otherMonster)) {
                            if (!otherMonster.waitingToMove) {
                                //monster.waitingToMove = true;
                                monster.waitToMove(1000);
                            }
                        }
                    }
                    
                }
                
                // Check to see if Bullet hit a Monster
                for (let b=0; b<this.bullets.length; b++) { // loop through all bullets
                    let tempBulletX = this.bullets[b].sprite.x; // current bullet X position
                    let tempBulletY = this.bullets[b].sprite.y; // current bullet Y position
                    if (monster.hitTest(tempBulletX, tempBulletY)) { // is x,y of bullet inside monster's hit radius?
                        console.log("hit!");

                        // add some blood below the monster
                        let bloodAmount = Math.floor(Math.random()*20); // NEEDS TO BE DIFFERENT FOR GUNS or based on monster damage
                        let bloodX = monster.sprite.x;
                        let bloodY = monster.sprite.y;
                        this.bloodSplatter(bloodAmount, bloodX, bloodY, 20, 20);

                        // deal damage to monster
                        monster.takeDamage(this.bullets[b].damage);

                        // increase score slightly
                        this.increaseScore(5);

                        // remove the bullet change to queue with object removal function
                        this.bulletsLayer.removeChild(this.bullets[b].sprite);
                        this.bullets[b].sprite.destroy();
                        this.bullets[b] = null;
                        let index = this.bullets.indexOf(this.bullets[b]); 
                        if (index > -1) { 
                            this.bullets.splice(index, 1); // remove the object at index (i)
                        }
                       
                        

                    
                        
                    }
                }

               
            }


            // Blood - fading and object cleanup
            for (let i=0; i<this.blood.length; i++) {
                // Move all Bullets in bulletsArray
                let tempBlood = this.blood[i];
                // fade blood as time passes
                tempBlood.fade();
                // Remove the oldest blood whenever maxBlood blood sprites exist 
                // if(this.blood.length >= 1000) {
                //     this.blood[0].sprite.destroy();
                //     this.bloodLayer.removeChild(this.blood[0].sprite);
                //     this.blood[0] = null;
                //     this.blood.shift();

                //     let index = this.nonPlayerSprites.indexOf(this.blood[0]); 
                //     if (index > -1) { 
                //         this.nonPlayerSprites.splice(index, 1); // remove the object at index (i)
                //     }
                // } 
            } 


            
            
        }

        // debug
        var bloodDiv = document.getElementById("bloodArray");
        bloodDiv.innerHTML = ""; //"blood[].length = " + this.blood.length;
        
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
    
    

    bloodSplatter(amount, x, y, sprayModX, sprayModY) {
        for (let b=0; b<amount; b++) {
            let sprayX = -10 + Math.floor(Math.random()*sprayModX);
            let sprayY = -10 + Math.floor(Math.random()*sprayModY);
            let blood = new Blood(this, x + sprayX, y + sprayY);
            this.blood.push(blood);
            this.bloodLayer.addChild(blood.sprite);
            this.nonPlayerSprites.push(blood.sprite); // add to WASD camera movement container
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
        document.getElementById('game-view').onmousedown = function downEvent(event) {
           parent.shoot();
           parent.mouseDown = true;
        }
        document.getElementById('game-view').onmouseup = function upEvent(event) {
            parent.mouseDown = false;
        }
        document.getElementById('game-view').onwheel = function wheelEvent(event) {
            if(event.deltaY < 0) {
                parent.scrollGuns(1);
            } else if (event.deltaY > 0) {
                parent.scrollGuns(-1);
            }
            
        }
    }

   
    shoot() {
        if (!this.gameOver) {
            // ifthe player has ammo for their current gun:
            if (this.currentGun.ammo > 0) {
                // use GunStrategy to shoot current gun w/ correct ammo
                this.currentGun.shoot();
                this.gui.updateAmmoText(this.currentGun.ammo);
                
            }
        }
    }

    scrollGuns(dir) {
        let keys = Object.keys(this.guns);
        let index = keys.indexOf(this.currentGun.type);
        let targetIndex = index + dir;
        if (targetIndex == -1) {
            targetIndex = keys.length-1;
        }
        if (targetIndex == keys.length) {
            targetIndex = 0;
        }
        this.currentGun = this.guns[keys[targetIndex]];

        this.player.changeGun(this.currentGun.type);

        this.gui.updateAmmoText(this.currentGun.ammo);
    }

    moveCamera(w, a, s, d) {
        // Simulate camera movement with WASD keys - move monsters with map and everything 
        let sprites = this.nonPlayerSprites;
        for (let index in sprites) {
            let sprite = sprites[index];
            if((w && a) || (a && s) || (s && d) || (d && w)) {
                sprite.y += w * this.moveSpeed * Math.sqrt(2)/2;
                sprite.x += a * this.moveSpeed * Math.sqrt(2)/2;
                sprite.y -= s * this.moveSpeed * Math.sqrt(2)/2;
                sprite.x -= d * this.moveSpeed * Math.sqrt(2)/2;
            } else {
                sprite.y += w * this.moveSpeed;
                sprite.x += a * this.moveSpeed;
                sprite.y -= s * this.moveSpeed;
                sprite.x -= d * this.moveSpeed;
            }
        }
    }

}
