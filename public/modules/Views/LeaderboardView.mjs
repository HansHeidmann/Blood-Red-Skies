export default class LeaderboardView {
    
    viewController;

    backButton;
    table;
    rows;

    constructor(viewController) {

        this.viewController = viewController;

        // back button
        this.backButton = document.getElementById('back-button');
        this.backButton.onclick = this.gotoMenuView.bind(this);

        // prepare table
        this.table = document.getElementById('leaderboard-table');
        this.rows = [];
        this.createTable();
    }

    gotoMenuView() {
        this.viewController.switchView('menu');
    }


    load() {
        console.log("loading leaderboardview...")
        
    }

    unload() {
        //
    }

    createTable() {
        const totalRows = 10;
        
        for (let row=0; row<totalRows; row++) {
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
        }
        this.populateTable();
    }
    
    populateTable() {
        for (let i=0; i<this.rows.length; i++) {
            this.rows[i].innerHTML = i + 1;
        }
    }

    
}