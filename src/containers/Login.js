import React from 'react';
import { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Login extends Component {
  state ={
    username:'',
    password:''
  }

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  loggedIn = () => {
    return !!localStorage.getItem('token')
  }

  userLogin = (e) => {
    e.preventDefault()
    this.createUser()
  }

  createUser = () => {
    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password.toLowerCase()
      })
    }).then(res => res.json())
      .then (token => localStorage.setItem('token', token.jwt))
      .then(console.log(localStorage))
  }


  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }}  veriticalalign='midle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2'color='blue' textAlign='center'>log-in to your account</Header>
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
        <Message>
          New? <a>Sign Up</a>   
          {/* will need pathing to signup page */}
        </Message>
        </Grid.Column>
        </Grid>
      </div>

    )
  }

}

export default Login
