import React from 'react';
import { Component } from 'react';
import { Grid, Image, Header, Message } from 'semantic-ui-react';



class SearchedProfile extends Component {
  
  state = {
    specificUser: [],
    specificGroups:[],
    specificKarmas:[]
  }

  getAllUsers = () =>{ 
    fetch('http://localhost:3000/api/users')
    .then(r=>r.json())
    .then(users=> {
    const specUser = this.findSpecficUser(users)
    this.setState({specificUser: specUser})
    })
  }

  findSpecficUser =(users) =>{
    return users.filter((user)=>{
      return user.name === localStorage.getItem('specificUser')
    })
  }

  mapOverOneUser =() => {
    return this.state.specificUser.map((user)=>{
      return(
        <>
        {user.name}
        </>
      )
    })
  }
  
  returnBioSection = () => {
    return this.state.specificUser.map( (user)=> {
      return(
        <>
        {user.bio}
        </>
      )
    })
  }


  componentDidMount(){
    this.getAllUsers()
  }

  render(){

    return(
      <>
      <div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
            {/* Headshot on SearchedProfile */}
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='large' rounded/>
               <Header as='h2' block>{this.mapOverOneUser()}</Header>
            </Grid.Column>
            <Grid.Column width={12}>
              <Message>
                <Message.Header>Tell us about yourself</Message.Header>
                  {this.returnBioSection()}
              </Message>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              {/* <Group 
              // {...this.props} 
              // history={this.props.history}
              />              */}
            </Grid.Column>
            <Grid.Column width={13}>
              {/* <Karma 
                // {...this.props} 
              /> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      </>
    )
  }
} 

export default SearchedProfile;
