import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      position: [],
      reverseSort: false
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      position: this.state.position.concat(i),
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  sortMoves() {
    this.setState({
      reverseSort: !this.state.reverseSort
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const location = this.state.position
      const desc = move ?
        'Go to move #' + move + ' ' + calculatePosition(location[move - 1]):
        'Go to game start';
      return (

        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
             className= { this.state.stepNumber === move ? "button toggled" : "button" }
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortMoves()}>Sort Moves</button>
          <ol className={ this.state.reverseSort ? "reverse" : "button" }>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculatePosition(location) {
  const colRow = [
    { col: 1, row: 1},
    { col: 2, row: 1},
    { col: 3, row: 1},
    { col: 1, row: 2},
    { col: 2, row: 2},
    { col: 3, row: 2},
    { col: 1, row: 3},
    { col: 2, row: 3},
    { col: 3, row: 3},
  ]
  return 'Col: ' + colRow[location].col + ' Row: ' + colRow[location].row
}
