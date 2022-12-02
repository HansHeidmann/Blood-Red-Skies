class GUI {

    healthImg;
    healthSprite;

    timeImg;
    timeSprite;

    healthTextStyle;
    healthText;

    timeTextStyle;
    timeText;

    constructor(gameView) {
        /*
        //background rect
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0x000, 0.35);
        graphics.drawRect(0, 0, 100, 45); 
        graphics.drawRect(500, 0, 100, 45); 
        graphics.endFill();
        graphics.beginFill(0xFFF, 0.2);
        gameView.guiLayer.addChild(graphics);
        */

        // text styles
        const healthTextStyle = new PIXI.TextStyle({
            fontWeight: 'bold',
            fill: ['#FF0000'], 
            stroke: '##000',
            strokeThickness: 5,
            align:'center',
            lineJoin: 'round',
        });
        const timeTextStyle = new PIXI.TextStyle({
            fontWeight: 'bold',
            fill: ['#00FFFF'], 
            stroke: '##000',
            strokeThickness: 5,
            align:'center',
            lineJoin: 'round',
        });
        const ammoTextStyle = new PIXI.TextStyle({
            fontWeight: 'bold',
            fill: ['#00FF00'], 
            stroke: '##000',
            strokeThickness: 5,
            align:'center',
            lineJoin: 'round',
        });
        const scoreTextStyle = new PIXI.TextStyle({
            fontWeight: 'bold',
            fill: ['#FFFF00'], 
            stroke: '##000',
            strokeThickness: 5,
            align:'center',
            lineJoin: 'round',
        });
    
        // add text to gui and put in guiLayer container
        this.healthText = new PIXI.Text("health", healthTextStyle);
        this.healthText.x = 45;
        this.healthText.y = 8;
        this.healthText.height = 25;
        
        this.timeText = new PIXI.Text("time", timeTextStyle);
        this.timeText.x = 600 - 100 + 10;
        this.timeText.y = 8;
        this.timeText.height = 25;

        this.ammoText = new PIXI.Text("ammo", ammoTextStyle);
        this.ammoText.x = 45;
        this.ammoText.y = 600 - 36;
        this.ammoText.height = 25;

        this.scoreText = new PIXI.Text("score", scoreTextStyle);
        this.scoreText.x = 600 - 100 + 10;
        this.scoreText.y = 600 - 36;
        this.scoreText.height = 25;

        this.healthText.displayGroup = gameView.guiLayer;
        this.timeText.displayGroup = gameView.guiLayer;
        this.ammoText.displayGroup = gameView.guiLayer;
        this.scoreText.displayGroup = gameView.guiLayer;
        
        gameView.guiLayer.addChild(this.healthText);
        gameView.guiLayer.addChild(this.timeText);
        gameView.guiLayer.addChild(this.ammoText);
        gameView.guiLayer.addChild(this.scoreText);
        

        // Sprite Initialization
        // heart
        this.healthImg = "../../img/GameView/gui/heart.png";
        this.healthSprite = PIXI.Sprite.from(this.healthImg);
        this.healthSprite.displayGroup = gameView.guiLayer;
        this.healthSprite.x = 10;
        this.healthSprite.y = 10;
        this.healthSprite.width = 25;
        this.healthSprite.height = 25;
        // clock
        this.timeImg = "../../img/GameView/gui/clock.png";
        this.timeSprite = PIXI.Sprite.from(this.timeImg);
        this.timeSprite.displayGroup = gameView.guiLayer;
        this.timeSprite.width = 25;
        this.timeSprite.height = 25;
        this.timeSprite.x = 600 - this.timeSprite.width - 10;
        this.timeSprite.y = 10;
        // ammo
        this.ammoImg = "../../img/GameView/gui/ammoIcon.png";
        this.ammoSprite = PIXI.Sprite.from(this.ammoImg);
        this.ammoSprite.displayGroup = gameView.guiLayer;
        this.ammoSprite.width = 25;
        this.ammoSprite.height = 25;
        this.ammoSprite.x = 10;
        this.ammoSprite.y = 600 - 10 - this.ammoSprite.height;
        // score
        this.scoreImg = "../../img/GameView/gui/scoreIcon.png";
        this.scoreSprite = PIXI.Sprite.from(this.scoreImg);
        this.scoreSprite.displayGroup = gameView.guiLayer;
        this.scoreSprite.width = 25;
        this.scoreSprite.height = 25;
        this.scoreSprite.x = 600 - this.timeSprite.width - 10;
        this.scoreSprite.y = 600 - 10 - this.scoreSprite.height;
        
    }

    updateHealthText(health) {
        this.healthText.text = Math.round(health);
    }

    updateTimeText(time) {
        this.timeText.text = Math.round(time);
        this.timeText.x = 600 - 50 - this.timeText.width + 10;
    }

    updateAmmoText(ammo) {
        this.ammoText.text = ammo;
    }

    updateScoreText(score) {
        this.scoreText.text = score;
        this.scoreText.x = 600 - 50 - this.scoreText.width + 10;
    }
   
}

export { GUI }