class AudioPlayer {

    soundsDictionary;

    constructor() {
        
        //
        // Audio File Howler Objects
        //
        this.theme = new Howl({
            src: ['audio/theme_song.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.2,
            onend: function() {
                //
            }
        });
        this.gunshot = new Howl({
            src: ['audio/gunshot.wav'],
            autoplay: false,
            loop: false,
            volume: 0.13,
            onend: function() {
                //
            }
        });
        this.reload = new Howl({
            src: ['audio/reload.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.2,
            onend: function() {
                //
            }
        });
        this.footsteps = new Howl({
            src: ['audio/footsteps.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.2,
            onend: function() {
                //
            }
        });



        //
        // Sounds Dictionary
        //
        // this.soundsDictionary = {
        //     "gunshot": this.gunshot,
        //     "reload": this.reload,
        //     "footsteps": this.footsteps
        // };

    }



    // play(name) {
    //     this.soundsDictionary[name].play();
    // }

    // stop(name) {
    //     this.soundsDictionary[name].stop();
    // }
}

export { AudioPlayer }