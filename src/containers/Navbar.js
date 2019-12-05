import React from 'react';
import { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';


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

  handleHomeClick = (e) => {
    this.props.history.push('/profile')
    window.location.reload(true);
  }

  chooseColleague = (e) => {
    //names should not be longer than three names, hard coded. Not ideal.
    let selection = e.target.innerText.split(' ')
    if (selection.length <= 3){
      this.props.history.push('/searchedprofile')
      this.props.selectedUser(e.target.innerText)
      window.location.reload(); 
      //antipattern by reloading when new selection happens
    } 
  }



  render(){

      const colleagueOptions = [
        {
          key:'Ian Hunter',
          text:'Ian Hunter',
          value:'Ian Hunter',
          // image: { avatar: true, src: 'https://react.semantic-ui.com/images/wireframe/image.png'} not clean for presentation
        },
        {
          key:'Peter Paul',
          text:'Peter Paul',
          value:'Peter Paul',
          // image: { avatar: true, src: 'https://react.semantic-ui.com/images/wireframe/image.png'}
        },
        {
          key:'Melissa Golba',
          text:'Melissa Golba',
          value:'Melissa Golba',
          // image: { avatar: true, src: 'https://react.semantic-ui.com/images/wireframe/image.png'}
        }
      ]

    return (
      
      <>
      {localStorage.getItem('currentUser') ? 
        <Menu secondary>
          <Menu.Item
            name='home'
            active={this.activeItem === 'home'}
            onClick={(e)=>this.handleHomeClick(e)}
          />
          <Menu.Menu position='right'>
          <Menu.Item>
          <Dropdown 
            placeholder='Select Colleague..' 
            fluid 
            selection 
            onChange={(e)=>this.chooseColleague(e)}
            options={colleagueOptions} 
          />
            {/* <Input  icon='search' placeholder='Search for colleagues...'/>  after mvp, will be switching to dynamic search*/}
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
        : null }
      </>
    )
  }

}



export default Navbar;