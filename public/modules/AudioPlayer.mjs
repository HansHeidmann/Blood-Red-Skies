class AudioPlayer {

    soundsDictionary;

    constructor() {
        
        //
        // Audio File Howler Objects
        //
        this.theme = new Howl({
            src: ['audio/theme_song.mp3'],
            autoplay: false,
            loop: true,
            volume: 0.15,
            onend: function() {
                // replay not needed here since can use loop:true above
            }
        });
        this.gunshot = new Howl({
            src: ['audio/gunshot.wav'],
            autoplay: false,
            loop: false,
            volume: 0.08,
        });
        this.reload = new Howl({
            src: ['audio/reload.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.2,
        });
        this.footsteps = new Howl({
            src: ['audio/footsteps.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.2,
        });



        // old 
        //
        // Sounds Dictionary
        //
        // this.soundsDictionary = {
        //     "gunshot": this.gunshot,
        //     "reload": this.reload,
        //     "footsteps": this.footsteps
        // };

    }

    // old

    // play(name) {
    //     this.soundsDictionary[name].play();
    // }

    // stop(name) {
    //     this.soundsDictionary[name].stop();
    // }
}

export { AudioPlayer }