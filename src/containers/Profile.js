import React from 'react';
import { Component } from 'react';
import Navbar from './Navbar';

class Profile extends Component {



  render(){
      // give all children components {...this.props} so that they may access 
    return(
      <div>
        <Navbar {...this.props}/>
        profile Page!
      </div>
    )
  }
}





export default Profile; 