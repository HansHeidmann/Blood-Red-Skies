import * as classes from "/modules/"

class scene {

    constructor(canvasWidth, canvasHeight) {

        width = canvasWidth;
        height = canvasHeight;

        frame = 0;
        gameOver = false;
        
        loopTimeoutId;
        frameRate = 1000/60; // 24 frames per second
        
        char = new char(width/2, height/2)
        
    }

    // load the game - positions objects and draws their sprites in canvas
    load() {

        console.log("loading...");

        // start the loop
        this.loop(frameRate);

    }


    // game loop - frameRate is set in main.js
    loop() {
        
        console.log("main loop iteration" + frame);

        redraw();
        
        // if gameOver == false --> run loop() again
        !gameOver ? loopTimeoutId = setTimeout(loop, frameRate) : console.log("GAME OVER");
            
    }


    // visual processing - (re)draw images/shapes in canvas element
    redraw() {
        
        canvas = document.getElementById("canvas");

        if (canvas.getContext) {

            var ctx = canvas.getContext("2d");

            ctx.imageSmoothingEnabled = false; // no anti-aliasing so pixels look good
            ctx.clearRect(0, 0, canvas.width, canvas.height); // empty canvas
            
            ctx.fillStyle = "blue"; 
            ctx.fillRect(0, 0, canvas.width, canvas.height); //add background color

            // draw plane sprite
            ctx.drawImage(char.sprite, char.x, char.y, char.width, char.height);

        }
    }

}
