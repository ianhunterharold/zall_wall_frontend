import React from 'react';
import { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Biography from './Biography'
import Group from './Group';
import Karma from './Karma';
import Headshot from '../components/Headshot';
// import SearchedProfile from './SearchedProfile';

class Profile extends Component {

  state = {
    users:[]
  }

  getAllUsers = () => {
    fetch('http://localhost:3000/api/users',{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })
    .then(r=>r.json())
    .then(allUsers=> {
      this.setState({users: allUsers })
    })
  }

  componentDidMount(){
    this.getAllUsers()
  }


  render(){
      // give all children components {...this.props} so that they may access 
    return(
      <div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <Headshot 
              {...this.props} 
              history={this.props.history}
              currentUser={this.props.currentUser} 
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Biography 
                {...this.props} 
                history={this.props.history}
                users={this.props.users} 
                currentUser={this.props.currentUser} 
              />
              {/* <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />biography */}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Group 
              {...this.props} 
              history={this.props.history}
              />             
            </Grid.Column>
            <Grid.Column width={13}>
              <Karma 
                {...this.props} 
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}





export default Profile; 