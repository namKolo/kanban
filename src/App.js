import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DragDropContext from './component/DragDropContext';
import Board from './component/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DragDropContext>
          <Board />
        </DragDropContext>
      </div>
    );
  }
}

export default App;
