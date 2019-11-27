import React from 'react';
import { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Input } from 'semantic-ui-react';


class CreateUser extends Component {

  //does username match any other username? if it does, flag with error 
  // do passwords match up? if they dont, flag with error 
  //methods for keeping state of username, 


  render(){
    return(
      <div>
        <div>
        <Grid textAlign='center' style={{ height: '100vh' }}  veriticalalign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2'color='blue' textAlign='center'>create account</Header>
        <form size='large'>  
          <Segment stacked>
          <Form.Input 
            fluid
            icon='user'
            iconPosition='left'
            type='username'
            id='username'
            placeholder= 'Select username'
            // value={this.state.createUsername}
            // onChange={this.handleInput}
          />
          <Form.Input 
            fluid
            icon='lock'
            iconPosition='left'
            type='password'
            id='password'
            placeholder= 'Choose password'
            // value={this.state.password}
            // onChange={this.handlePasswordInput}
          />
          <Form.Input 
            fluid
            icon='lock'
            iconPosition='left'
            type='secondPassword'
            id='secondPassword'
            placeholder= 'Re-type password'
            // value={this.state.password}
            // onChange={this.handlePasswordInput}
          />
          <Button color='blue' fluid size='large' type='submit'>Login</Button>
          </Segment>
        </form>
        </Grid.Column>
        </Grid>
        </div>
      </div>
    )
  }

}

export default CreateUser; 
