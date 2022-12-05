import { getData } from '../FirebaseManager.mjs';

export default class LeaderboardView {
    
    viewController;

    backButton;
    table;
    rows;
    scoreCols;
    nameCols;

    constructor(viewController) {

        this.viewController = viewController;

        // back button
        this.backButton = document.getElementById('back-button');
        this.backButton.onclick = this.gotoMenuView.bind(this);

        // prepare table
        this.table = document.getElementById('leaderboard-table');
        this.rows = [];
        this.scoreCols = [];
        this.nameCols = [];
        this.createTable();
    }

    gotoMenuView() {
        this.viewController.switchView('menu');
    }


    load() {
        console.log("loading leaderboardview...")

        this.populateTable();
        
    }

    unload() {
        //
    }

    createTable() {
        const totalRows = 10;
        this.createRows(10);
    }

    createRows(amount) {
        for (let row=0; row<amount; row++) {
            let rowDiv = document.createElement("div");
            rowDiv.style.position = "relative";
            rowDiv.style.height = "7.5%";
            rowDiv.style.margin = "1% 0% 0% 0";
            rowDiv.style.width = "95%";
            rowDiv.style.backgroundColor = "white";
            rowDiv.style.color = "black";
            rowDiv.style.fontSize = "30px";
            this.table.appendChild(rowDiv);
            this.rows.push(rowDiv);

            this.createCols(rowDiv);
        }
    }

    createCols(row) {
        let scoreCol = document.createElement("div");
        scoreCol.style.display = "inline-block";
        scoreCol.style.paddingRight = "10%";
        scoreCol.style.alignItems = "right";
        let nameCol = document.createElement("div");
        nameCol.style.display = "inline-block";
        nameCol.style.paddingLeft = "10%";
        scoreCol.style.alignItems = "left";
        row.appendChild(scoreCol);
        row.appendChild(nameCol);
        this.scoreCols.push(scoreCol);
        this.nameCols.push(nameCol);
    }
    
    async populateTable() {

        let limit = 10; //get 10 scores
        let leaderboardData = await getData(limit);

        let index = 0;
        leaderboardData.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data().score}`);
            this.scoreCols[index].innerHTML = doc.data().score;
            this.nameCols[index].innerHTML = doc.data().name;
            index++;
        });
        
    }

    
}