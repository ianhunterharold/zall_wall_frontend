import React from 'react';
import './App.css';
import { Component } from 'react';
import Login from './containers/Login'


class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">    
        </header> 
        <Login />
      </div>
    );
  }

}

export default App;
