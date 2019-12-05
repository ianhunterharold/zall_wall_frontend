import React from 'react';
import { Component } from 'react'
import { Form, Message, Button } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

class EditBiography extends Component {
  
  state={
    updatedBioSection: JSON.parse(localStorage.getItem('currentUser'))['bio']
  }

  handleUpdatingBio =(e) => {
    this.setState({updatedBioSection: this.textarea.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.updateBio();
    this.props.editBioFlipStateToFalse();
  }

  updateBio = () => {
    fetch(`http://localhost:3000/api/users/${JSON.parse(localStorage.getItem('currentUser'))['id']}`, {
      method:'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept :'application/json'
      },
      body: JSON.stringify({
        bio: this.state.updatedBioSection
      })
    })
    .then(r => r.json())
    .then(updatedUserObject => { 
      this.renderUpdatedBio(updatedUserObject)
    })
    .catch(err => console.log(err))
  }

  renderUpdatedBio = (updatedUserObject) => {
    this.props.setBio(updatedUserObject.bio)
    localStorage.setItem('currentUser',JSON.stringify(updatedUserObject))
  }

  render(){
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <Message>
            <Message.Header>Tell Us about Yourself</Message.Header>
              <TextareaAutosize  inputRef={tag => (this.textarea = tag)} onChange ={(e)=>this.handleUpdatingBio(e)}>
                {this.state.updatedBioSection}
              </TextareaAutosize >
            </Message>
          <Button className='ui basic button' className='ui right floated button'>Submit Changes</Button>
        </Form>
      </div>
  )}
}

export default EditBiography; 