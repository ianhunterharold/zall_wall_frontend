import React from 'react';
import { Component } from 'react';
import { Message } from 'semantic-ui-react';

class Biography extends Component {

  editBio = (e) => {
    console.log("did I click on the entire bio secion?",e)
  }

  render(){
    return (
      <div className='biography'  onClick = {(e)=> this.editBio(e)} >
        <Message>
        <Message.Header>Tell us about yourself</Message.Header>
        {JSON.parse(localStorage.getItem('currentUser'))['bio']}
        </Message>
      </div>
    )
  }
}

export default Biography; 