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

        let spacesToCheck = [...bottomRow, ...middleRow, ...topRow];

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

    floodFillReveal(x, y) {
        if(!(x < this.rows && x >= 0 && y < this.cols && y >= 0)) return;
        // https://en.wikipedia.org/wiki/Flood_fill
        const target = 0;
        const square = this.matrix[x][y];
        if(square.visible) return;
        if(square.text != 0 || square.isBomb) return;
        square.visible = true;
        let squareDOM = document.getElementById(`${x}${y}`);
       // squareDOM.textContent = square.text;    
        squareDOM.style.backgroundColor = 'lightblue';

        this.floodFillReveal(x, y+1); // South
        this.floodFillReveal(x, y-1); // North
        this.floodFillReveal(x-1, y); // West
        this.floodFillReveal(x+1, y); // East
    }
}

export default Board;