var React = require('react')

const boardHeight = 10;
const boardWidth = 10;

function Square(props) {
  return (
    <div className={props.value}>
    </div>
  );
}

function Ant()
{
  return (
    <div className="white">
      <img src="download.png" id="pic"/>
    </div>
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

  renderAnt: function() {
    return (
      <Ant/>
    );
  },

  render: function() {
    var board = [];
    var squareNum = 0;

    for(var i=0; i<boardHeight; i++) {
      var boardRow = [];
      for(var j=0; j<boardWidth; j++) {
        if (i==0 && j==0)
          boardRow.push(this.renderAnt());
        else
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