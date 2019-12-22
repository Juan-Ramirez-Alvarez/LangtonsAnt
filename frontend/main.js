(function() {
    // React
    var React = require('react');
    var ReactDOM = require('react-dom');
  
    var Board = require("./components/board");
    ReactDOM.render(<Board />, document.getElementById('board'));
  
  })();