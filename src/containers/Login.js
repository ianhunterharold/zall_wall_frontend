import React from 'react';
import { Component } from 'react';

class Login extends Component {
  state ={
    username:'',
    password:''
  }

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value })
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
      .then (console.log)
  }


  render() {
    return (
      <div>
        <form onSubmit={this.userLogin}>
          <label>username</label>
          <input 
            type='text'
            id='username'
            placeholder= 'username'
            value={this.state.username}
            onChange={this.handleInput}
            required
          />
          <label>password</label>
          <input 
            type='text'
            id='password'
            placeholder= 'password'
            value={this.state.password}
            onChange={this.handleInput}
            required
          />
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

}

export default Login
