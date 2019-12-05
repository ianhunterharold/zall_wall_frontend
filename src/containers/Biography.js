import React from 'react';
import { Component } from 'react';
import { Message, TextArea, Form } from 'semantic-ui-react';
import EditBiography from './EditBiography'

class Biography extends Component {

  componentDidMount(){
    console.log('profile mounted', JSON.parse(localStorage.getItem('currentUser'))['bio'])
    console.log(this.props.bioSection)
  }

  render(){
    return(
      <>
      <div>
        <div className='biography'>
          <Message>
          <Message.Header>Tell Us about Yourself</Message.Header>
            {this.props.bioSection}
            {/* {JSON.parse(localStorage.getItem('currentUser'))['bio']} */}
          </Message> 
        </div>
      </div>
      </>
    )
  }

}

export default Biography; 