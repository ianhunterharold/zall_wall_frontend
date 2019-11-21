import React from 'react';
import './App.css';
import { Component } from 'react';
import Login from './containers/Login' 
import Profile from './containers/Profile';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class App extends Component {

  loggedIn = () => {
    return !!localStorage.getItem('token')
  }

  render(){
    console.log(this.loggedIn())
    return (
      <div className="App">
        <Router>
          {this.loggedIn() ? null : <Redirect to='/'/>}
          <Route exact path='/' render={props => {
          return <Login {...props} />
          }}
          />
          <Route exact path='/profile' render={ (props) => {
            return <Profile 
            {...props}
            />}
          }/>
        </Router>
      </div>
    );
  }

}

export default App;
