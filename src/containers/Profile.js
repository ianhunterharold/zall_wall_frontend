import React from 'react';
import { Component } from 'react';
import Navbar from './Navbar';
import { Grid, Image } from 'semantic-ui-react';
import Biography from '../components/Biography'
class Profile extends Component {



  render(){
      // give all children components {...this.props} so that they may access 
    return(
      <div>
        <Navbar {...this.props}/>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />profile headshot/name
            </Grid.Column>
            <Grid.Column width={12}>
              biography from profile component
              <Biography />
              {/* <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />biography */}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={13}>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}





export default Profile; 