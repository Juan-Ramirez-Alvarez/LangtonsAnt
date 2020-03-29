var React = require('react')

const boardHeight = 10;
const boardWidth = 10;

const Direction = {"Up":1, "Down":2, "Left":3, "Right":4}
Object.freeze(Direction)

function Square(props) {
  return (
    <div className={props.value}>
      {props.value}
    </div>
  );
}

Ant = React.createClass ({
  getInitialState: function() {
    return {
      direction: Direction.Up,
    }
  },

  nextMove: function(props) {
    if (this.isOnBlack(props))
    {

    }
  },

  isOnBlack: function(props) {
    var squares = props.squares
    var X = props.X
    var Y = props.Y

    var currentColor = squares[X][Y]

    return currentColor === "black"
  },

  render: function() {
    return (
      <div className="white">
        <input type="image" src="./download.png" id="pic" onClick={() => this.nextMove(this.props)} />
      </div>
    );
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    var squares = new Array(boardWidth)
    for (var i = 0; i < boardWidth; i++)
    {
      var inner = Array(boardHeight).fill("white")
      squares[i] = inner
    }

    return {
      squares: squares,
      X: 0,
      Y: 0,
    }
  },

  renderSquare: function(x, y) {
    return (
      <Square
        value={this.state.squares[x][y]}
      />
    );
  },

  renderAnt: function() {
    return (
      <Ant
      X={this.state.X}
      Y={this.state.Y}
      setNewBoardState={this.setNewBoardState}
      squares={this.state.squares.slice()}
      />
    );
  },

  setNewBoardState: function(x, y) {
    const squares = this.state.squares.slice()
    this.setState({
      squares: squares,
      X: x,
      Y: y,
    })
  },

  render: function() {
    var board = [];

    for(var i=0; i<boardHeight; i++) {
      var boardRow = [];
      for(var j=0; j<boardWidth; j++) {
        if (i===this.state.X && j===this.state.Y)
          boardRow.push(this.renderAnt());
        else
          boardRow.push(this.renderSquare(i, j));
      }
      board.push(<div className="board-row">{boardRow}</div>);
    }

    return (
      <div>
        {board}
      </div>
    );
  }
})
