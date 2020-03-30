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
    return {}
  },
  rotate: function (props) {
    var newDirection
    if (this.isOnBlack(props)) {
      switch (props.direction) {
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
      switch (props.direction) {
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
    this.moveHelper(newDirection)
  },
  moveHelper: function(newDirection) {
    var props = this.props
    switch (newDirection) {
      case Direction.Left:
        var newX = props.X - 1
        if (newX < 0) {
          props.setNewBoardState(props.X, props.Y, Direction.Right)
        }
        else {
          props.setNewBoardState(newX, props.Y, newDirection)
        }
        break
      case Direction.Right:
        var newX = props.X + 1
        if (newX === boardWidth) {
          props.setNewBoardState(props.X, props.Y, Direction.Left)
        }
        else {
          props.setNewBoardState(newX, props.Y, newDirection)
        }
        break
      case Direction.Up:
        var newY = props.Y - 1
        if (newY < 0) {
          props.setNewBoardState(props.X, props.Y, Direction.Down)
        }
        else {
          props.setNewBoardState(props.X, newY, newDirection)
        }
        break
      case Direction.Down:
        var newY = props.Y + 1
        if (newY === boardHeight) {
          props.setNewBoardState(props.X, props.Y, Direction.Up)
        }
        else {
          props.setNewBoardState(props.X, newY, newDirection)
        }
        break
      default:
        break
    }
  },
  isOnBlack: function () {
    var squares = this.props.squares
    var X = this.props.X
    var Y = this.props.Y
    var currentColor = squares[X][Y]
    return currentColor === "black"
  },
  render: function () {
    return (
      <div className="white">
        <input type="image" src={this.props.direction} id="pic" onClick={() => this.nextMove(this.props)} />
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
      direction: Direction.Right,
      X: 5,
      Y: 5,
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
        direction={this.state.direction}
        setNewBoardState={this.setNewBoardState}
        squares={this.state.squares.slice()}
      />
    );
  },
  setNewBoardState: function (x, y, direction) {
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
      direction: direction,
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