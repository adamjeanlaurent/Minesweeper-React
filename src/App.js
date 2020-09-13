import React, { useState } from "react";
import "./App.css";
import uniqid from "uniqid";

import Board from "./lib/Board";
import { logRoles } from "@testing-library/react";

function App() {
    const [game, resetGame] = useState(1);
    // setup game board
    let board = new Board(); 
    board.setup();

    let mouseControlsEnabled = true; /* used to disable clicks when board is resetting */

    function squareClicked(e) {
      if(!mouseControlsEnabled) return;
        const x = parseInt(e.target.getAttribute("x"));
        const y = parseInt(e.target.getAttribute("y"));
        const text = e.target.getAttribute("text");

        let squareThatWasClicked = board.matrix[x][y];

        // if square is not visbile, show it
        if (!squareThatWasClicked.isVisible) {
            squareThatWasClicked.isVisible = true;
            // if clicked a bomb, lose
            if (squareThatWasClicked.isBomb) {
                e.target.textContent = text;
                e.target.style.backgroundColor = "lightblue";
                lose();
            } 
            // if clicked a non-bomb reveal
            else {
                board.floodFillReveal(x, y);
            }
        }
    }

    function lose() {
        // stop user from clicking after loss
        mouseControlsEnabled = false; 
        // show all not visible squares
        for (let i = 0; i < board.rows; i++) {
            for (let j = 0; j < board.cols; j++) {
                let square = board.matrix[i][j];
                if (!square.visible) {
                    let squareDOM = document.getElementById("" + i + j);
                    squareDOM.textContent = square.text;
                    squareDOM.style.backgroundColor = "lightblue";
                }
            }
        }

        // show restart message
        document.getElementById('restart').textContent = 'You Lose! Restarting In 5 Seconds ⏰';

        // in 5 seconds reset board
        setTimeout(() => {
            reset();
            document.getElementById('restart').textContent = '';
        }, 5000);
    }

    function reset() {
        board = new Board();
        board.setup();
        resetGame(game + 1);
        mouseControlsEnabled = true;
    }

    // right-click to display flag
    document.addEventListener("contextmenu", (e) => {
        const flag = "🚩";
        e.preventDefault();
        if (e.target.classList !== 0) {
            if (e.target.classList.contains("square")) {
                const x = parseInt(e.target.getAttribute("x"));
                const y = parseInt(e.target.getAttribute("y"));

                if (!board.matrix[x][y].visible) {
                    if (e.target.textContent === flag) {
                        e.target.textContent = "";
                    } else {
                        e.target.textContent = flag;
                    }
                }
            }
        }
    });
    
    return (
        <div className="App">
            <h3 id ="restart"></h3>
            <div className="box">
                {board.matrix.map((row, xIdx) => {
                    return row.map((square, yIdx) => {
                        return (
                            <div
                                onClick={squareClicked}
                                className="square"
                                x={xIdx}
                                y={yIdx}
                                text={square.text}
                                id={`${xIdx}${yIdx}`}
                                key={uniqid()}
                            ></div>
                        );
                    });
                })}
            </div>
        </div>
    );
}

export default App;
