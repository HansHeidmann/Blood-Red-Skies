class Monster {
    
    width;
    height; 

    img;
    sprite;

    speed;
    direction;

    constructor(gameView) {
        
        // Sprite Initialization
        this.img = "../../img/GameView/vampire/vampire_standing.png";
        this.sprite = PIXI.Sprite.from(this.img);
        this.sprite.anchor.set(0.5);
        
        // X and Y position
        this.sprite.x = Math.random()*gameView.game.screen.width;
        this.sprite.y = Math.random()*gameView.game.screen.height;

        
        // Width and Height
        this.sprite.width = 100;
        this.sprite.height = 100;

        // set move Speed
        this.speed = .01;
        this.sprite.rotation = Math.random()*3.14;

    }
    

    shoot() {
        console.log("shot!");
    }

    move() {
        this.sprite.x += Math.cos(this.sprite.rotation-Math.PI/2) * this.speed;
        this.sprite.y += Math.sin(this.sprite.rotation-Math.PI/2) * this.speed;
    }

    


    
   
    
}

export { Monster }