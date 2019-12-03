import React from 'react';
import  { Button, Image, Card } from 'semantic-ui-react'


const GroupImage =(props) => {

  return (
    <div className='ui blue card'>
      <Card>
        <div>
          <Card.Content as='h4'>
            <Button fluid>
              {props.group.name}
            </Button>
          </Card.Content> 
        </div>
          <div>
            <Image src={props.group.group_image}/>
          </div>
        <Button circular icon='x' onClick={(e) => props.removeSelfFromGroup(e, props.id)}
        />
      </Card>
    </div>
  )
}

export default GroupImage; 