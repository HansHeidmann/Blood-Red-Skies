class Tree {
    
    x;
    y;
    type;

    constructor(x, y, type) {

        this.x = x;
        this.y = y;
        this.type = type;

    }

    draw(gameView) {
        this.type.draw(gameView, this.x, this.y);
    }

}

export { Tree }