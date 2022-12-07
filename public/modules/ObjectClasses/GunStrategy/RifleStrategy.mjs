import { Bullet } from '../Bullet.mjs';

class RifleStrategy {
    
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

        this.type = "rifle";
        this.gunLength = 50;
        this.bulletSpeed = 14;
        this.bulletDamage = 8;
        this.bulletSize = 20;
        this.autoReload = true;
        
        this.resetGun();
    }

    resetGun() {
        this.owned = true;
        this.ammo = 100;
        this.reloadSpeed = 80;
        this.canShoot = true;
        this.canReload = true;
    }

    shoot() {
        if (this.canShoot) {
            this.canShoot = false;
            // add bullets
            let shootDirection = this.gameView.player.mouseAngle;
            // create a Bullet instance and push it to the bulletsArray
            let tempBullet = new Bullet(this.gameView, shootDirection, this);
            this.gameView.bullets.push(tempBullet);
            // add the bullet sprite to the game stage
            this.gameView.bulletsLayer.addChild(tempBullet.sprite);
            // remove 1 bullet from this gun's clip
            this.ammo--;
            // play shoot sound
            if(!this.gameView.soundOff) {
                this.gameView.audioPlayer.gunshot.play();
            }
            
            // make player wait to shoot again
            if(this.autoReload == true) {
                this.reload();
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

export { RifleStrategy }