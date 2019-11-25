import React from 'react';
import  { Button } from 'semantic-ui-react'


const GroupImage =(props) => {


  return (
    <div className='ui blue card'>
      
      <div> 
        Group
          <div>
            {props.group.name}
          </div>
      </div>
      <div>
        <div>
          Image
        </div >
        <div>
          {props.group.group_image} 
        </div>
      </div>
      <Button circular icon='x' onClick={(e) => props.removeSelfFromGroup(e, props.id)}
      />
    </div>
  )
}

export default GroupImage; 