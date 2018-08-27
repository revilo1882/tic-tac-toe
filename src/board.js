import React from 'react';
import './index.css';

class Board extends React.Component {
  renderSquare(i) {
    let won = false;
    if (this.props.winningPos && this.props.winningPos.includes(i)) {
      won =true;
    }
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        won={won}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoard() {
    let board = []
    for (let i = 0; i < 3; i++) {
      let row = []
      for (let j = i * 3; j < (i * 3) + 3; j++) {
        row.push(this.renderSquare(j))
      }
      board.push(<div key={i} className='board-row'>{row}</div>)
    }
    return board
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}

function Square(props) {
  return (
    <button
      className="square"
      style={props.won ? {background: '#0000ff'} : {background: '#fff'}}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Board;
