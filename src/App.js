import React, {useState} from 'react';
import './App.css';
import uniqid from 'uniqid';

import Board from './lib/Board';

function App() {

  // setup game board
  let board = new Board();
  board.setup();
  
  function squareClicked(e) {
    const x = parseInt(e.target.getAttribute('x'));
    const y = parseInt(e.target.getAttribute('y'));
    const text = e.target.getAttribute('text');

    if(!board.matrix[x][y].isVisible) {
      board.matrix[x][y].isVisible = true;
      if(board.matrix[x][y].text != 0) {
        e.target.textContent = text;
        e.target.style.backgroundColor = 'lightblue';
      }
      else {
        board.floodFillReveal(x,y);
      }

    // use x and y to check neighboring squares
    // seems like first click reveals a bunch, but next ones only reveal what you clicked on ?
    }
  }
  
  return (
    <div className="App">
      <div className="box">
        {board.matrix.map((row, xIdx) => {
          return (
            row.map((square, yIdx) => {
              return (<div onClick = {squareClicked} className="square" x = {xIdx} y={yIdx} text={square.text} id = {`${xIdx}${yIdx}`} key={uniqid()}></div>)
            })
          )
        })}
      </div>
    </div>
  );
}

export default App;