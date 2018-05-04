
import React, { Component } from 'react';
import logo from '../imgs/logo.png';
import './App.css';
import NewsPanel from '../Components/NewsPanel/NewsPanel';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <img className="logo" alt="logo" src={logo} />
        </div>
        <div className="container">
          <NewsPanel />
        </div>
      </div>
    );
  }
}

export default App;
