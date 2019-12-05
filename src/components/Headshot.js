import React from 'react';
import { Image, Header } from 'semantic-ui-react';

const Headshot =(props) => {

  return (
    props.currentUser ? 
    <div>
      <Image src={props.currentUser.picture} className='ui centered medium image' rounded/>
<Header as='h2' block className='blue'>{JSON.parse(localStorage.getItem('currentUser'))['name']}</Header>
    </div> : window.location.reload() 
  )
}

export default Headshot; 