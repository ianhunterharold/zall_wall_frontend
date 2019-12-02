import React from 'react';
import { Component } from 'react';
import GroupImage from '../components/GroupImage';
import { Dropdown } from 'semantic-ui-react';

class Group extends Component{

  state = {
    groups: [],
    selectedGroup:[]
  }

  getAllGroups = () => {
    fetch('http://localhost:3000/groups',{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(r=>r.json())
    .then(allGroups=> {
      this.setState({groups: allGroups})
    })
  }

  filterUserGroups = () => {
    const convertedObjectIntoArrayOfValues = Object.values(this.state.groups)
      return convertedObjectIntoArrayOfValues.filter( (group) => {
      return JSON.parse(localStorage.currentUser)['id'] === group.user_id;
    })
  }

  mapOverGroup = () => {
    return this.filterUserGroups().map(group => {
      return <GroupImage
        {...this.props} 
        history={this.props.history}
        group={group} 
        key={group.id}  
        id={group.id} 
        removeSelfFromGroup={this.removeSelfFromGroup}
      />  
    })
  }

  removeSelfFromGroup = (e, id) => {
    fetch(`http://localhost:3000/groups/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.deleteGroup(id)
    })
    .catch(err => console.log(err))
  }

  deleteGroup = (id) => {

      let newGroups = this.state.groups.filter( (group) => {
        // console.log(groups,"was stating that groups was not an array.")
        return group.id !== id
      })
      this.setState({
        groups: newGroups
      })
  }

  joinGroup = (e ) =>{
    e.persist()

    let currentUserId =  JSON.parse(localStorage.getItem('currentUser'))['id']
    // anon function below is triggering our fetch once our state has been set, fixing async state.
    this.setState({selectedGroup: e.target.innerText }, () => {
      fetch('http://localhost:3000/groups', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          name: this.state.selectedGroup,
          user_id: currentUserId,
          group_image: ''
        })
      })
      .then(r => r.json())
      .then((group)=> {
      this.addNewGroup(group)
      })
      .catch(err => console.log(err))
    })
  }

  addNewGroup = (group) => {
    
    return this.setState(previousState =>({  
      groups: [
        ...previousState.groups, group
      ],
    }))  
  }
  
  componentDidMount(){
    this.getAllGroups()
  }

  render (){

    const options = [
      { key: 1, text: 'Running', value: 1},
      { key: 2, text: 'Cat', value: 2}, 
      { key: 3, text: 'Dogs', value: 3},
      { key: 4, text: 'Yoga', value: 4},
      { key: 5, text: 'Sports', value: 5},
      { key: 6, text: 'Espionage', value: 6}
    ]

    return (
      <div>
        <Dropdown text='Join Group' options={options} value={this.state.value} onChange={(e)=>this.joinGroup(e)} simple item />
        {this.mapOverGroup()}
      </div>
    )
  }
  

}
export default Group; 