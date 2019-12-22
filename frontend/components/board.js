var React = require('react')

const boardHeight = 10;
const boardWidth = 10;

function Square(props) {
  return (
    <button className="square" id={props.value}>
    </button>
  );
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      squares: Array(boardHeight*boardWidth).fill("white"),
    }
  },

  renderSquare: function(i) {
    return (
      <Square
        value={this.state.squares[i]}
      />
    );
  },

  render: function() {
    var board = [];
    var squareNum = 0;

    for(var i=0; i<boardHeight; i++) {
      var boardRow = [];
      for(var j=0; j<boardWidth; j++) {
        boardRow.push(this.renderSquare(squareNum));
        squareNum++;
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