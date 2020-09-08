import random from "random";
import Square from "./Square";
import Point from "./Point";

class Board {
    constructor() {
        this.cols = 8;
        this.rows = 8;
        this.numOfBombs = 10;
        this.matrix = [];
    }

    setup() {
        this.fillMatrix();
        this.setBombLocations();
        this.assignNumBombsTouching();
    }

    fillMatrix() {
        for(let i = 0; i < this.rows; i++) {
            this.matrix.push(new Array(8).fill(''));
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = new Square(false);
            }
        }
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
                this.matrix[x][y].text = 'Bomb!';
            } 
        }
    }

    assignNumBombsTouching() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(!this.matrix[i][j].isBomb) {
                    this.matrix[i][j].text = this.findNumBombsTouching(i,j);
                }
            }
        }
    }

    findNumBombsTouching(i,j) {
        let bottomRow = [new Point(i + 1, j - 1), new Point(i + 1, j), new Point(i + 1, j + 1)];
        let middleRow = [new Point(i, j - 1), new Point(i, j + 1)];
        let topRow = [new Point(i - 1, j - 1), new Point(i - 1, j), new Point(i - 1, j + 1)];

        let spacesToCheck = [... bottomRow, ... middleRow, ... topRow];

        let numOfBombsTouching = 0;

        for(let space of spacesToCheck) {
            if(space.i < this.rows && space.i >= 0 && space.j < this.cols && space.j >= 0) {
                if(this.matrix[space.i][space.j].isBomb) {
                    numOfBombsTouching++;
                }
            }
        }
        return numOfBombsTouching; 
    }
}

export default Board;
