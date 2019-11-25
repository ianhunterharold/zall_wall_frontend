import React from 'react';
import { Image, Header } from 'semantic-ui-react';

const Headshot =(props) => {
  // let currentUserImage = props.currentUser['picture'];
  // let currentUserName = props.currentUser['name'];
  // is local storage asycnronous ? 
  
  return (
    <div>
      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='large' rounded/>
      <Header as='h2' block>{props.currentUser['name']}</Header>
    </div>
  )

}

export default Headshot; 