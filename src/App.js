import React from 'react';
import './App.css';

function App() {

  let board = new Array(8).fill(new Array(8).fill(''));

  console.log(board);

  return (
    <div className="App">
      <div className="box">
        {board.map((row) => {
          return (
            row.map((square) => {
              return (<div className="square">{square}</div>)
            })
          )
        })}
      </div>
    </div>
  );
}

export default App;
