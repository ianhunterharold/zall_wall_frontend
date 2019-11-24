import React from 'react';
import { Component } from 'react';
import GroupImage from '../components/GroupImage';

class Group extends Component{

  filterUserGroups = () => {
    return this.props.groups.filter( (group) => {
      return JSON.parse(localStorage.currentUser)['id'] === group.user_id
    })
  }

  mapOverGroup = () => {
    return this.filterUserGroups().map(group =>{
      return <GroupImage group={group} key={group.id}/> 
    })
  }


  render (){
    return (
      <div>
        {this.mapOverGroup()}
      </div>
    )
  }
  

}
export default Group; 