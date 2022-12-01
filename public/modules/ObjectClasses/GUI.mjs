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
            fill: ['#ffffff', '#FFFF00'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            align:'center',
            lineJoin: 'round',
        });
        const timeTextStyle = new PIXI.TextStyle({
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ffFF'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            align:'center',
            lineJoin: 'round',
        });
    
        // add text to gui and put in guiLayer container
        this.healthText = new PIXI.Text(100, healthTextStyle);
        this.healthText.x = 45;
        this.healthText.y = 10;
        this.healthText.height = 25;
        
        this.timeText = new PIXI.Text(0, timeTextStyle);
        this.timeText.x = 600 - 100 + 10;
        this.timeText.y = 10;
        this.timeText.height = 25;

        this.healthText.displayGroup = gameView.guiLayer;
        this.timeText.displayGroup = gameView.guiLayer;
        
        gameView.guiLayer.addChild(this.healthText);
        gameView.guiLayer.addChild(this.timeText);
        

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
        
    }

    updateText(health, time) {
        this.healthText.text = Math.round(health);
        this.timeText.text = Math.round(time);
        this.timeText.x = 600 - 50 - this.timeText.width + 10
    }
   
}

export { GUI }