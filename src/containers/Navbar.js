import React from 'react';
import { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Navbar extends Component {
  
  logOut = () => {
    localStorage.clear();
    this.props.history.push('/')
  }

  render(){
    return(
      <>
        <div>Navbar</div>
        <Button onClick={this.logOut}>log out</Button>
      </>
    )
  }

}



export default Navbar;