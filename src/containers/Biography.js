import React from 'react';
import { Component } from 'react';
import { Message } from 'semantic-ui-react';
// import { Button } from 'semantic-ui-react';

class Biography extends Component {
// this.props.currentUser['bio']
  render(){
    return (
      <div className='biography'>
        <Message>
        <Message.Header>Tell us about yourself</Message.Header>
        {JSON.parse(localStorage.getItem('currentUser'))['bio'] }
        {/* <Button size='small' onClick={this.editBio}>edit</Button> */}
        </Message>
      </div>
    )
  }
}

export default Biography; 