import React from 'react';
import './App.css';
import { PureComponent } from 'react';
import Login from './containers/Login' 
import Profile from './containers/Profile';
import Navbar from './containers/Navbar';
import SearchedProfile from './containers/SearchedProfile'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import CreateUser from './containers/CreateUser';


class App extends PureComponent {

  state = {
    currentUser: {},
    selectedColleague:'',
    allUsers:[]
  }

  loggedIn = () => {
    return !!localStorage.getItem('token')
  }

  rehydrateState = () => {
    if (localStorage.getItem('currentUser') !== 'undefined') {
      this.setState( {currentUser: JSON.parse(localStorage.getItem('currentUser')) })
    } 
    // console.log('rehydrating myself everytime the page loads, slightly buggy not updating current user even though in state current user is there', this.currentUser)
  }

  captureCurrentUser = (currentUser) => {
    this.setState({currentUser: currentUser })
    localStorage.setItem('currentUser',JSON.stringify(currentUser))
  }

  selectedUser = (selectedColleague) => {
    this.setState({ 
      // explicitly assigning my state
      selectedColleague: selectedColleague 
      }, ()=> { 
        console.log(this.state.selectedColleague)
        this.settingSpecificUserInLocalStorage();
        //setting localstorage after setstate is finished
      }) 
  }

  settingSpecificUserInLocalStorage = () => {
    localStorage.setItem('specificUser', this.state.selectedColleague)
    // this.triggerUserIdChange()
  }
  
  // triggerUserIdChange = () => {
  //   console.log('triggerUserIdChange')
  //   localStorage.setItem('specificUserId',JSON.stringify(this.state.selectedColleague[0]['id']))
  // }

  getAllUsers = () => {
    fetch('http://localhost:3000/api/users')
    .then(r=>r.json())
    .then(allUsers => this.setState({
      allUsers: allUsers
    }))
  }

  componentDidMount(){
    this.getAllUsers();
    this.rehydrateState();
  } 

  render(){
    return (
      <div className="App">
        <Router>
          {this.loggedIn() ? null : <Redirect to='/'/>}
          <Route exact path='/' render={ (props) => {
          return <Login {...props} 
            captureCurrentUser={this.captureCurrentUser}
            currentUser={this.state.currentUser}
            allUsers={this.state.allUsers}
            />}
          }/>
          <Route path='/' render={ (props) => {
            return < Navbar
              {...props}
              selectedUser={this.selectedUser}
            />}
          }/>
          <Route exact path='/profile' render={ (props) => {
            return <Profile 
            currentUser={this.state.currentUser}
            {...props}
            {...this.props}
            />}
          }/>
          <Route exact path='/searchedprofile' render={ (props) => { 
            return <SearchedProfile
              {...props}
              selectedUser={this.selectedUser}
            />}
          }/>
          {/* <Route exact path='/createaccount'
          component={CreateUser} 
          /> */}
        </Router>
      </div>
    );
  }

}

export default App;
