import React, {Component} from 'react';

import './App.css';
import {JSONInput} from './JSONInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Sort JSON</p>
        </header>
        <div id="area">
          <JSONInput />
        </div>
      </div>
    );
  }
}

export default App;
