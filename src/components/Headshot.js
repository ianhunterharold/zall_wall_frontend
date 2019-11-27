import React from 'react';
import { Image, Header } from 'semantic-ui-react';

const Headshot =(props) => {

  return (
    <div>
      <Image src='' size='large' rounded/>
<Header as='h2' block>{JSON.parse(localStorage.getItem('currentUser'))['name']}</Header>
    </div>
  )
}

export default Headshot; 