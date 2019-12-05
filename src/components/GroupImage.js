import React from 'react';
import  { Button, Image, Card } from 'semantic-ui-react'


const GroupImage =(props) => {

  return (
    <div className='ui blue card'>
      <Card>
        <div>
          <Card.Content as='h4'>
            <Button fluid className='ui blue basic button'>
              {props.group.name}
            </Button>
          </Card.Content> 
        </div>
          <div>
            <Image size='medium' src={props.group.group_image}/>
          </div>
        <Button circular icon='x' onClick={(e) => props.removeSelfFromGroup(e, props.id)}
        />
      </Card>
    </div>
  )
}

export default GroupImage; 