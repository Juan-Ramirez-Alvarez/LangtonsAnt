var React = require('react')

const boardHeight = 10;
const boardWidth = 10;

const Direction = { "Up": "./download_up.png", "Down": "./download_down.png", "Left": "./download_left.png", "Right": "./download_right.png" }
Object.freeze(Direction)

function Square(props) {
  return (
    <div className={props.value}>
    </div>
  );
}

Ant = React.createClass({
  getInitialState: function () {
    return {
      direction: Direction.Right,
    }
  },

  outOfBounds: function (props) {
  },

  rotate: function (props) {
    var newDirection
    if (this.isOnBlack(props)) {
      switch (this.state.direction) {
        case Direction.Up:
          newDirection = Direction.Left
          break
        case Direction.Left:
          newDirection = Direction.Down
          break
        case Direction.Down:
          newDirection = Direction.Right
          break
        case Direction.Right:
          newDirection = Direction.Up
          break
        default:
          break;
      }
    }
    else {
      switch (this.state.direction) {
        case Direction.Up:
          newDirection = Direction.Right
          break
        case Direction.Right:
          newDirection = Direction.Down
          break
        case Direction.Down:
          newDirection = Direction.Left
          break
        case Direction.Left:
          newDirection = Direction.Up
          break
        default:
          break
      }
    }

    return newDirection
  },

  nextMove: function (props) {
    var newDirection = this.rotate(props)
    alert(newDirection)
    this.setState({direction: newDirection}, this.moveHelper)
  },

  moveHelper: function() {
    var props = this.props
    alert(this.state.direction)
    switch (this.state.direction) {
      case Direction.Left:
        var newX = props.X - 1
        if (newX < 0) {
          this.setState({direction: Direction.Right})
          props.setNewBoardState(props.X, props.Y)
        }
        else {
          props.setNewBoardState(newX, props.Y)
        }
        break
      case Direction.Right:
        var newX = props.X + 1
        if (newX === boardWidth) {
          this.setState({direction: Direction.Left})
          props.setNewBoardState(props.X, props.Y)
        }
        else {
          props.setNewBoardState(newX, props.Y)
        }
        break
      case Direction.Up:
        var newY = props.Y - 1
        if (newY < 0) {
          this.setState({direction: Direction.Down})
          props.setNewBoardState(props.X, props.Y)
        }
        else {
          props.setNewBoardState(props.X, newY)
        }
        break
      case Direction.Down:
        alert("here")
        var newY = props.Y + 1
        if (newY === boardHeight) {
          this.setState({direction: Direction.Up})
          props.setNewBoardState(props.X, props.Y)
        }
        else {
          props.setNewBoardState(props.X, newY)
        }
        break
      default:
        break
    }

  },

  isOnBlack: function (props) {
    var squares = props.squares
    var X = props.X
    var Y = props.Y

    var currentColor = squares[X][Y]

    return currentColor === "black"
  },

  render: function () {
    return (
      <div className="white">
        <input type="image" src={this.state.direction} id="pic" onClick={() => this.nextMove(this.props)} />
      </div>
    );
  }
});

module.exports = React.createClass({
  getInitialState: function () {
    var squares = new Array(boardWidth)
    for (var i = 0; i < boardWidth; i++) {
      var inner = Array(boardHeight).fill("white")
      squares[i] = inner
    }

    return {
      squares: squares,
      X: 0,
      Y: 0,
    }
  },

  renderSquare: function (x, y) {
    return (
      <Square
        value={this.state.squares[x][y]}
      />
    );
  },

  renderAnt: function () {
    return (
      <Ant
        X={this.state.X}
        Y={this.state.Y}
        setNewBoardState={this.setNewBoardState}
        squares={this.state.squares.slice()}
      />
    );
  },

  setNewBoardState: function (x, y) {
    const squares = this.state.squares.slice()
    var X = this.state.X
    var Y = this.state.Y
    if (squares[X][Y] === "white") {
      squares[X][Y] = "black"
    }
    else {
      squares[X][Y] = "white"
    }
    this.setState({
      squares: squares,
      X: x,
      Y: y,
    })
  },

  render: function () {
    var board = [];

    // height will tell us # of rows
    // width will tell us # of cols
    for (var Y = 0; Y < boardHeight; Y++) {
      var boardRow = [];
      for (var X = 0; X < boardWidth; X++) {
        if (X === this.state.X && Y === this.state.Y)
          boardRow.push(this.renderAnt());
        else
          boardRow.push(this.renderSquare(X, Y));
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
