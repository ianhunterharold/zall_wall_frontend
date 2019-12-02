import React from 'react';
import { Component } from 'react';
import { Grid, Image, Header, Message, Comment, Form, Card, TextArea, Button } from 'semantic-ui-react';

class SearchedProfile extends Component {
  
  state = {
    specificUser: [],
    specificGroups:[],
    specificKarmas:[],
    currentKarmaInput:''
  }

  getAllKarmas = () => {
    fetch('http://localhost:3000/karmas')
    .then(r=>r.json())
    .then(karmas => {
      const specKarmas = this.findSpecKarma(karmas)
      this.setState({specificKarmas: specKarmas })
    })
  }

  findSpecKarma =(karmas) => {
    return karmas.filter( (karma) => {
      return karma.user_id === parseInt(localStorage.getItem('specificUserId'))
    })
  }

  mapOverKarma = () => {
    return this.state.specificKarmas.map( (karma) => {
      return(
        <>
          {karma.content}
        </>
      )
    })
  }
  
  getAllGroups = () => {
    fetch('http://localhost:3000/groups')
    .then(r=>r.json())
    .then(groups => {
      const specGroups = this.findSpecificGroup(groups)
      this.setState({specificGroups: specGroups})
    })
  }
  
  findSpecificGroup = (groups) => {
    return groups.filter( (group) => { 
      return group.user_id === parseInt(localStorage.getItem('specificUserId'))
    })
  }

  mapOverGroups = () => {
    return this.state.specificGroups.map((group) => {
      return(
        <>
          <div className='ui blue card'>
            {group.name}
          </div>
        </>
      ) 
    })
  }

  getAllUsers = () => { 
    fetch('http://localhost:3000/api/users')
    .then(r=>r.json())
    .then( (users) => {
      const specUser = this.findSpecficUser(users)
      this.setState({specificUser: specUser}, ()=> {
        //added callback function so that state could be updated then local storage off of states value.
        localStorage.setItem('specificUserId',JSON.stringify(specUser[0]['id']))
        // going inside of the array, at the first object and targeting the id, not ideal but works for the time being.
      })
    })
  }
  
  findSpecficUser =(users) => {
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

  handleKarmaInputChange = (e) => {
    this.setState({currentKarmaInput: e.target.value})
  }

  onSubmittingKarma = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/karmas', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({  
        content: this.state.currentKarmaInput,
        user_id: parseInt(localStorage.getItem('specificUserId'))
      })
    }).then(r=>r.json())
    .then(newKarma => {
      this.addingToSpecKarma(newKarma)
      this.resetKarmaInput()
    })
    .catch(err => console.log(err))
  }

    addingToSpecKarma = (newKarma) => {
      this.setState( (previousState) => {
        return {
        specificKarmas: [...previousState.specificKarmas, newKarma]
        }
      })
    }

    resetKarmaInput = () => {
      this.setState({
        currentKarmaInput:''
      })
    }
  componentDidMount(){
    this.getAllUsers()
    this.getAllGroups()
    this.getAllKarmas()
  }

  render(){
      
    return(
      <>
      <div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
            {/* Headshot on SearchedProfile */}
            {/* <Image src={this.state.specificUser.picture} size='large' rounded /> */}
             {/* {console.log(this.state.specificUser[0],"specific user")} */}
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
            {this.mapOverGroups()}
            </Grid.Column>
            <Grid.Column width={13}>
            <Form onSubmit={this.onSubmittingKarma}>
              <Card fluid color='blue'>
                <TextArea
                  placeholder='words of encouragement..'
                  id='karma'
                  name='karma'
                  value={this.state.currentKarmaInput}
                  type='text'
                  onChange={this.handleKarmaInputChange}
                />
              </Card>    
              <Button fluid>Send</Button>
            </Form>
              <Comment.Content>
                <Comment.Text>
                  <Comment.Group size='large'>
                    {this.mapOverKarma()}
                  </Comment.Group>
                </Comment.Text>
              </Comment.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      </>
    )
  }
} 

export default SearchedProfile;
