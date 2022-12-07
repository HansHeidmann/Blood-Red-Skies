import { Bullet } from '../Bullet.mjs';

class ShotgunStrategy {
    
    gameView;

    type;
    gunLength;
    bulletSpeed;
    bulletDamage;
    bulletSize;
    owned;
    ammo;
    autoReload;
    canReload;
    reloadSpeed;

    constructor(gameView) {
        
        this.gameView = gameView;

        this.type = "shotgun";
        this.gunLength = 50;
        this.bulletSpeed = 19;
        this.bulletDamage = 3;
        this.bulletSize = 4;
        this.autoReload = true;
        
        this.resetGun();
    }

    resetGun() {
        this.owned = true;
        this.ammo = 10;
        this.reloadSpeed = 1000;
        this.canShoot = true;
        this.canReload = true;
    }

    shoot() {
        if (this.canShoot) {
            this.canShoot = false
            // add bullets
            let bbCount = 50; // amount of bbs in shotgun shell
            for (let b=0; b<bbCount; b++) {
                let sprayAmount = -Math.PI/6 + Math.random()*Math.PI/3;
                let shootDirection = this.gameView.player.mouseAngle + sprayAmount;
                // create a Bullet instance and push it to the bulletsArray
                let tempBullet = new Bullet(this.gameView, shootDirection, this);
                this.gameView.bullets.push(tempBullet);
                // add the bullet sprite to the game stage
                this.gameView.bulletsLayer.addChild(tempBullet.sprite);
                
            }
            // remove 1 "shell" from this gun
            this.ammo--;
            
            // turn on autoReload above for suuuuper OP shotgun !!!
            if(this.autoReload == true) {
                this.reload();
            }

            // play soundaaaaawda
            if(!this.gameView.soundOff) {
                this.gameView.audioPlayer.gunshot.play();
            }
        }
        
    }

    reload() {
        if (this.canReload) {
            let timeOut = setTimeout(this.readyGun, this.reloadSpeed, this);
            this.canReload = false;
        }
    }

    readyGun(parent) {
        parent.canShoot = true;
        parent.canReload = true;
    }


}

export { ShotgunStrategy }