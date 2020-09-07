import random from "random";
import Square from "./Square";

class Board {
    constructor() {
        this.cols = 8;
        this.rows = 8;
        this.numOfBombs = 10;
        this.matrix = [];
    }

    fillMatrix() {
       for(let i = 0; i < this.rows; i++) {
           this.matrix.push(new Array(8));
           for(let j = 0; this.cols; j++) {
               this.matrix[i][j] = new Square(false);
           }
       }    
        this.setBombLocations();
    }

    setBombLocations() {
        let bombLocations = new Set();

        while (bombLocations.size < this.numOfBombs) {
            let x = random.int(0, 7);
            let y = random.int(0, 7);
            let xy_str = `[${x},${y}]`;

            if (bombLocations.has(xy_str)) {
                continue;
            }

            else {
                bombLocations.add(xy_str);
                this.matrix[x][y].isBomb = true;
            } 
        }
    }
}

export default Board;
