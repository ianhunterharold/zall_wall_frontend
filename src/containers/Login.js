import React from 'react';
import { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import LoginAlert from '../components/LoginAlert';
// import { NavLink } from 'react-router-dom';

class Login extends Component {
  state ={
    username:'',
    password:'',
    loginAlert: false
  }

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  loggedIn = () => {
    return !!localStorage.getItem('token')
  }

  userLogin = (e) => {
    e.preventDefault()
    let logginInUser = this.props.allUsers.find(user => user.username === this.state.username.toLowerCase())
    if(!logginInUser){
      this.loginUpdateState()
    } else {
      this.verifyUser()
    }
  }

  loginUpdateState = () => {
    this.setState({loginAlert:true})
  }

  verifyUser = () => {
    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password.toLowerCase()
      })
    }).then(res => res.json())
      .then (token => {
        localStorage.setItem('token', token.jwt)
        console.log( localStorage.setItem('token', token.jwt) )
        localStorage.setItem('currentUser', JSON.stringify(token.user))
        // this.currentUser(token.user)
        this.loggedIn();
        this.props.history.push('/profile')
      })
      .catch(err => console.log(err))
  }
  
  // currentUser = (LoggedInUser) => {
  //   let currentUserLoggedIn = this.props.users.find( user => user.username === this.state.username) 
  //   this.props.captureCurrentUser(currentUserLoggedIn)
  // }
  
  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }}  veriticalalign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2'color='blue' textAlign='center'>log-in to your account</Header>
        { this.state.loginAlert ? <LoginAlert /> : null }
        <form size='large' onSubmit={this.userLogin}>  
          <Segment stacked>
          <Form.Input 
            fluid
            icon='user'
            iconPosition='left'
            type='username'
            id='username'
            placeholder= 'Username'
            value={this.state.username}
            onChange={this.handleInput}
          />
          <Form.Input 
            fluid
            icon='lock'
            iconPosition='left'
            type='password'
            id='password'
            placeholder= 'Password'
            value={this.state.password}
            onChange={this.handleInput}
          />
          <Button color='blue' fluid size='large' type='submit'>Login</Button>
          </Segment>
        </form>
        {/* <Message>
          New? <NavLink to='/createaccount'>Sign Up</NavLink>   
        </Message> */}
        </Grid.Column>
        </Grid>
      </div>
    )
  }

}

export default Login
