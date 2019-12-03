import React from 'react';
import { Component } from 'react';
import GroupImage from '../components/GroupImage';
import { Dropdown } from 'semantic-ui-react';

class Group extends Component{

  state = {
    groups: [],
    selectedGroup:[],
    selectedGroupImage:''
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
        return group.id !== id
      })
      this.setState({
        groups: newGroups
      })
  }

  joinGroup = (e) =>{
    e.persist()
    this.compareTextToUpdatePicture(e)

    const returnedArray = this.compareTextToUpdatePicture(e)
    this.pluckOffImageString(returnedArray)

    const currentPluckedImageString = this.pluckOffImageString(returnedArray)

    let currentUserId =  JSON.parse(localStorage.getItem('currentUser'))['id']
    // anon function below is triggering our fetch once our state has been set, fixing async state
    this.setState({
      selectedGroup: e.target.innerText,
      selectedGroupImage: currentPluckedImageString
    }, () => {
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
          group_image: this.state.selectedGroupImage
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

  compareTextToUpdatePicture = (e) => {
    const groupImagesArray = [
      {name: 'Running', grouppicture:'https://i.imgur.com/PVqLlsb.png'},
      {name: 'Cats', grouppicture:'https://i.imgur.com/PQqCbop.png'},
      {name: 'Dogs', grouppicture:'https://i.imgur.com/62kaaj6.png'},
      {name: 'Yoga', grouppicture:'https://i.imgur.com/JOU9odS.png'},
      {name: 'Sports', grouppicture:'https://i.imgur.com/DwXhyGJ.png'}
    ]
    console.log(e.target.innerText)
    return groupImagesArray.filter((individualObject)=> e.target.innerText === individualObject.name)
  }

  pluckOffImageString = (returnedArray) => {
    return returnedArray[0].grouppicture
  }

  componentDidMount(){
    this.getAllGroups()
  }

  render (){

    const options = [
      { key: 1, text: 'Running', value: 1},
      { key: 2, text: 'Cats', value: 2}, 
      { key: 3, text: 'Dogs', value: 3},
      { key: 4, text: 'Yoga', value: 4},
      { key: 5, text: 'Sports', value: 5},
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