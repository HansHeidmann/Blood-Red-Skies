class KeyboardHandler {
    
    wKeyDown;
    aKeyDown;
    sKeyDown;
    dKeyDown;
    spaceKeyDown;

    constructor(gameView) {
        this.wKeyDown = false;
        this.aKeyDown = false;
        this.sKeyDown = false;
        this.dKeyDown = false;
        this.spaceKeyDown = false;

        this.handle(this);
    }
    

    handle(parent) {
        window.onkeydown = function keyEvent(event) {
            if(event.key == "w") {
                console.log("w");
                parent.wKeyDown = true;
            }
            if(event.key == "a") {
                console.log("a");
                parent.aKeyDown = true;
            }
            if(event.key == "s") {
                console.log("s");
                parent.sKeyDown = true;
            }
            if(event.key == "d") {
                console.log("d");
                parent.dKeyDown = true;
            }
            if(event.key == " ") {
                console.log("space");
                parent.spaceKeyDown = true;
            }
        }
        window.onkeyup = function keyEvent(event) {
            if(event.key == "w") {
                console.log("w up");
                this.wKeyDown = false;
            }
            if(event.key == "a") {
                console.log("a up");
                this.aKeyDown = false;
            }
            if(event.key == "s") {
                console.log("s up");
                this.sKeyDown = false;
            }
            if(event.key == "d") {
                console.log("d up");
                this.dKeyDown = false;
            }
            if(event.key == " ") {
                console.log("space up");
                this.spaceKeyDown = false;
            }
        }
        
    }

    


     //parent.game.stage.anchor.set(parent.player.sprite.x, parent.player.sprite.y);
   
    
}

export { KeyboardHandler }