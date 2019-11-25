import React from 'react';
import { Component } from 'react';
import GroupImage from '../components/GroupImage';
import { Dropdown } from 'semantic-ui-react';

class Group extends Component{

  state = {
    groups: []
  }

  getAllGroups = () => {
    fetch('http://localhost:3000/groups',{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(r=>r.json())
    .then(allGroups=>this.setState({groups: allGroups}))
  }

  filterUserGroups = () => {
    return this.state.groups.filter( (group) => {
      return JSON.parse(localStorage.currentUser)['id'] === group.user_id
    })
  }

  mapOverGroup = () => {
    return this.filterUserGroups().map(group => {
      return <GroupImage
        {...this.props} 
        group={group} 
        key={group.id}  
        id={group.id} 
        removeSelfFromGroup={this.removeSelfFromGroup}/>  
    })
  }
  joinGroup = (value) =>{
    console.log("did I select a group",value)
  }






   //removeSelfFromGroup = (e, id) => {
  // this.deleteGroup(id)
  // }
  //unauhorized error, removing from state but not from backend...unauthorized 401
  removeSelfFromGroup = (e, id) => {
    console.log(" Have I clicked this button?",e, id)
    fetch(`http://localhost:3000/groups/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.deleteGroup(id)
    })
  }
// }
  
    deleteGroup = (id) => {
       let newGroups = this.state.groups.filter( (group) => {
          return group.id !== id
        })
        this.setState({
          groups: newGroups
        })
    }


    componentDidMount(){
      this.getAllGroups()
    }
    
  render (){

    const options = [
      { key: 1, text: 'Running', value: 1, id:1 },
      { key: 2, text: 'Cat', value: 2,id:2}, 
      { key: 3, text: 'Dogs', value: 3, id:3},
      { key: 4, text: 'Yoga', value: 4, id:4},
      { key: 5, text: 'Sports', value: 5, id:5},
      { key: 6, text: 'Espionage', value: 6, id:6}
    ]

    return (
      <div>
        <Dropdown text='Join Group' options={options} value={this.state.value} onChange={()=>this.joinGroup()} simple item />
        {this.mapOverGroup()}
      </div>
    )
  }
  

}
export default Group; 