import React from 'react';
import './App.css';
import { PureComponent } from 'react';
import Login from './containers/Login' 
import Profile from './containers/Profile';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class App extends PureComponent {

  state = {
    currentUser: {}
  }


  loggedIn = () => {
    return !!localStorage.getItem('token')
  }

  componentDidMount(){
    this.rehydrateState();
  } 

  componentWillUnmount(){
    this.setState({});
  }

  // rehydrate state is saying that everytime we refresh the page, reset state to be igual to the local storage

  rehydrateState = () => {
    this.setState({currentUser: JSON.parse(localStorage.getItem('currentUser')) })
    console.log('rehydrating myself everytime the page loads, slightly buggy not updating current user even though in state current user is there', this.currentUser)
  }

  captureCurrentUser = (currentUser) => {
    this.setState({currentUser: currentUser })
    localStorage.setItem('currentUser',JSON.stringify(currentUser))
    console.log('captureCurrentUser', this.state.currentUser)
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
            />}
          }/>
          <Route exact path='/profile' render={ (props) => {
            return <Profile 
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
