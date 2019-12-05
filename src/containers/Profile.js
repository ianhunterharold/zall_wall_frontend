import React from 'react';
import { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Biography from './Biography'
import Group from './Group';
import Karma from './Karma';
import Headshot from '../components/Headshot';
import EditBiography from './EditBiography';

class Profile extends Component {

  state = {
    users:[],
    bioSection: JSON.parse(localStorage.getItem('currentUser'))['bio'],
    clicked: false
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

  editBio = (e) => {
    this.setState({clicked: true})  
  }

  editBioFlipStateToFalse = () => {

    this.setState({clicked: false})
  }

  setBio = (newBio) => {
    this.setState({
      bioSection: newBio
    })
  }

  componentDidMount(){
    this.getAllUsers()
  }

  render(){
  
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
              <div onClick = {this.editBio}>
              {this.state.clicked ? 
              <EditBiography 
              setBio = {this.setBio}
              clicked={this.state.clicked}
              editBioFlipStateToFalse={this.editBioFlipStateToFalse}
              /> 
              : 
              <Biography 
                {...this.props} 
                history={this.props.history}
                users={this.props.users} 
                currentUser={this.props.currentUser} 
                bioSection={this.state.bioSection}
              />}
              </div>
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
                users={this.state.users}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      
    )
  }
}





export default Profile; 