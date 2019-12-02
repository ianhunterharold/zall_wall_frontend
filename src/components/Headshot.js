import React from 'react';
import { Image, Header } from 'semantic-ui-react';

const Headshot =(props) => {

  return (
    props.currentUser ? 
    <div>
      <Image src={props.currentUser.picture} size='large' rounded/>
<Header as='h2' block>{JSON.parse(localStorage.getItem('currentUser'))['name']}</Header>
    </div> : window.location.reload() 
    // if image <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='large' rounded/>
  // window.location.reload() thinking about adding page reload so that headshot will render on page
  )
}

export default Headshot; 