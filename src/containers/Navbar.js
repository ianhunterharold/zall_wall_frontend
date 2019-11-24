import React from 'react';
import { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';


class Navbar extends Component {

  state = { 
    activeItem:'home' 
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logOut = () => {
    localStorage.clear();
    this.props.history.push('/')
    window.location.reload(true); 
  }


  render(){
    return(
      <Menu secondary>
        <Menu.Item
          name='home'
          active={this.activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
        <Menu.Item>
          <Input icon='search' placeholder='Search for colleagues...'/> 
        </Menu.Item>
        <Menu.Item
          name='logout'
          active={this.activeItem === 'logout'}
          onClick={ () => {
            this.logOut();
          }}
          />
        </Menu.Menu>
      </Menu>
    )
  }

}



export default Navbar;