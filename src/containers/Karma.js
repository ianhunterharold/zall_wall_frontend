import React from 'react';
import { Component } from 'react';
import KarmaIndividualComment from '../components/KarmaIndividualComment';
import { Form, TextArea, Button, Card } from 'semantic-ui-react';


class Karma extends Component{

  state = {
    karmas: [],
    karmaInput:''
  }
  componentDidMount(){
    this.getAllKarmas()
  }

  getAllKarmas = () => {
    fetch('http://localhost:3000/karmas',{
      method: 'GET',
      headers: {
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(r=>r.json())
    .then(allKarma => {
      this.setState({karmas: allKarma})
    })
  }

  filterKarma = () => {
    const objectToArrayOfValues = Object.values(this.state.karmas)
    return objectToArrayOfValues.filter((karma) => {
      return JSON.parse(localStorage.currentUser)['id'] === karma.user_id
    })
  }

  mapOverKarma = () => {
    // console.log(this.filterKarma())
    return this.filterKarma().map((karma) => {
      return <KarmaIndividualComment 
      {...this.props}
      key={karma.id}
      karma={karma}
      id={karma.id}
      /> 
    })
  }

  sendKarma = (e) => {
    e.preventDefault()
    this.setState({karmaInput:`You can't give yourself karma, it doesn't work like that ;)`})
  }

  handleChange =(e) => {
    this.setState({karmaInput :e.target.value})
  }
  
render(){
  return (
    <div>
      <div>
        <Form>
          <Card fluid color='blue'>
            <TextArea
              placeholder='words of encouragement..'
              value={this.state.karmaInput}
              type='karma'
              onChange={this.handleChange}
            />
          </Card>    
          <Button fluid onClick={(e)=> this.sendKarma(e)}>Send</Button>
        </Form>
      </div>
      <div>
        <Card fluid color='blue'>
          {this.mapOverKarma()}
        </Card>
      </div>
    </div>
    )
  }
  
}

export default Karma; 
