import React from 'react';
import { Component } from 'react';
import { Message } from 'semantic-ui-react';
// import { Button } from 'semantic-ui-react';

class Biography extends Component {




  // editBio =() => { 
  //   console.log(this.props.currentUser)
  //   console.log("clicking on edit bio button")
  //   // fetch('http://localhost:3000/api/users')
  // }

  render(){
    // console.log(this.props.currentUser['bio']) 
    return (
      <div className='biography'>
        <Message>
        <Message.Header>Tell us about yourself</Message.Header>
        {this.props.currentUser['bio']}
        {/* <Button size='small' onClick={this.editBio}>edit</Button> */}
        </Message>
      </div>
    )
  }
}

export default Biography; 