import React from 'react';
import './App.css';
import { Component } from 'react';
import Login from './containers/Login' 
import Profile from './containers/Profile';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class App extends Component {

  state = {
    users: [],
    currentUser: {}
  }

  loggedIn = () => {
    return !!localStorage.getItem('token')
  }

  getAllUsers = () => {
    fetch('http://localhost:3000/api/users')
    .then(r=>r.json())
    .then(allUsers=>this.setState({users: allUsers }))
  }

  componentDidMount(){
    this.getAllUsers()
    this.setState({currentUser: JSON.parse(localStorage.getItem('currentUser')) })
  }

  captureCurrentUser = (currentUser) => {
    this.setState({currentUser: currentUser })
    localStorage.setItem('currentUser',JSON.stringify(currentUser))
  }


  render(){
    return (
      <div className="App">
        <Router>
          {this.loggedIn() ? null : <Redirect to='/'/>}
          <Route exact path='/' render={props => {
          return <Login {...props} 
            captureCurrentUser={this.captureCurrentUser}
            currentUser={this.state.currentUser}
            users={this.state.users}
            />}
          }/>
          <Route exact path='/profile' render={ (props) => {
            return <Profile 
            users={this.state.users}
            currentUser={this.state.currentUser}
            {...props}
            />}
          }/>
        </Router>
      </div>
    );
  }

}

export default App;
