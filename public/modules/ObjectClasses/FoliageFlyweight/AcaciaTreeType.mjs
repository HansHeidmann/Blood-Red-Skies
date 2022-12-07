class AcaciaTreeType {
    
    name;
    color;
    texture;

    constructor() {

        this.name = "acacia";
        this.color = "65280"; 
        this.texture = "../../img/GameView/tree.png";
        //this.sprite.tint = this.color;
        
    }

    draw(gameView, x, y) {
        let sprite = PIXI.Sprite.from(this.texture);
        sprite.anchor.set(0.5);
        sprite.width = 15 + Math.floor(Math.random() * 15);
        sprite.height = 15 + Math.floor(Math.random() * 15);
        sprite.x = x;
        sprite.y = y;
        gameView.nonPlayerSprites.push(sprite);
        gameView.treesLayer.addChild(sprite);
    }



}

export { AcaciaTreeType }