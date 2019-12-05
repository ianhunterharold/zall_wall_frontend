import React from 'react';
import { Component } from 'react';
import { Message } from 'semantic-ui-react';

class Biography extends Component {

  render(){
    return(
      <>
      <div>
        <div className='biography'>
          <Message>
          <Message.Header>Tell Us about Yourself</Message.Header>
            {this.props.bioSection}
          </Message> 
        </div>
      </div>
      </>
    )
  }

}

export default Biography; 