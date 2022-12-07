class KeyboardHandler {
    
    wKeyDown;
    aKeyDown;
    sKeyDown;
    dKeyDown;
    rKeyDown;
    spaceKeyDown;

    constructor(gameView) {
        this.wKeyDown = false;
        this.aKeyDown = false;
        this.sKeyDown = false;
        this.dKeyDown = false;
        this.rKeyDown = false;
        this.spaceKeyDown = false;

        this.handle(this);
    }
    

    handle(parent) {
        window.onkeydown = function keyEvent(event) {
            if(event.key == "w" || event.key == "W") {
                //console.log("w");
                parent.wKeyDown = true;
            }
            if(event.key == "a" || event.key == "A") {
                //console.log("a");
                parent.aKeyDown = true;
            }
            if(event.key == "s" || event.key == "S") {
                //console.log("s");
                parent.sKeyDown = true;
            }
            if(event.key == "d" || event.key == "D") {
                //console.log("d");
                parent.dKeyDown = true;
            }
            if(event.key == "r" || event.key == "R") {
                //console.log("r");
                parent.rKeyDown = true;
            }
            if(event.key == " ") {
                //console.log("space");
                parent.spaceKeyDown = true;
            }
        }
        window.onkeyup = function otherKeyEvent(event) {
            if(event.key == "w") {
                //console.log("w up");
                parent.wKeyDown = false;
            }
            if(event.key == "a") {
                //console.log("a up");
                parent.aKeyDown = false;
            }
            if(event.key == "s") {
                //console.log("s up");
                parent.sKeyDown = false;
            }
            if(event.key == "d") {
                //console.log("d up");
                parent.dKeyDown = false;
            }
            if(event.key == "r") {
                //console.log("r up");
                parent.rKeyDown = false;
            }
            if(event.key == " ") {
                //console.log("space up");
                parent.spaceKeyDown = false;
            }
        }
        
    }

    


     //parent.game.stage.anchor.set(parent.player.sprite.x, parent.player.sprite.y);
   
    
}

export { KeyboardHandler }