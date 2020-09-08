import React, {useState} from 'react';
import './App.css';
import uniqid from 'uniqid';

import Board from './lib/Board';

function App() {

  // setup game board
  let board = new Board();
  board.setup();
  
  function squareClicked(e) {
    e.target.textContent = e.target.getAttribute('val');
  }
  
  return (
    <div className="App">
      <div className="box">
        {board.matrix.map((row) => {
          return (
            row.map((square) => {
              return (<div onClick = {squareClicked} className="square" val={square.text} key={uniqid()}></div>)
            })
          )
        })}
      </div>
    </div>
  );
}

export default App;
