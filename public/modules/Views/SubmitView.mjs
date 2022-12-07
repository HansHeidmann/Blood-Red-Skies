import { firebaseApp } from '../FirebaseManager.mjs';
import { firestoreDatabase } from '../FirebaseManager.mjs';
import { addData } from '../FirebaseManager.mjs';

export default class SubmitView {
    
    viewController;

    nameField;
    submitButton;

    randomUsername;

    constructor(viewController) {

        this.viewController = viewController;

        // HTML elems
        this.nameField = document.getElementById('name-field');
        this.submitButton = document.getElementById('submit-button');

        // Submit
        this.submitButton.onclick = this.submitScore.bind(this);

        // add placeholder username
        this.generateUsername();
    }
    
    load() {
        console.log("loading leaderboardview...")
        
    }

    gotoLeaderboardView() {
        this.viewController.switchView('leaderboard');
    }
    
    submitScore() {

        // do firebase stuff
        this.firebaseStuff()

        addData(this.nameField.value, this.viewController.game.score);

        // Switch to leaderboard view to show high scores table
        this.gotoLeaderboardView();
    }

   

    generateUsername() {
        this.randomUsername = "Player--";
        let charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i=0; i<10; i++) {
            this.randomUsername += charArray[Math.floor(Math.random()*charArray.length)];
        }
        this.nameField.value = this.randomUsername;
    }




    
}