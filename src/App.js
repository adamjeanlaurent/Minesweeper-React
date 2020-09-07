import React from 'react';
import './App.css';
import uniqid from 'uniqid';

import Board from './lib/Board';

function App() {

  let board = new Board();
  board.fillMatrix();
  
  return (
    <div className="App">
      <div className="box">
        {board.matrix.map((row) => {
          return (
            row.map((square) => {
              return (<div className="square" key={uniqid()}>{ (square.isBomb) ? "bomb" : ""}</div>)
            })
          )
        })}
      </div>
    </div>
  );
}

export default App;
