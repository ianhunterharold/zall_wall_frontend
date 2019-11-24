import React from 'react';

const GroupImage =(props) => {
  

  return (
    <div>
     {props.group.name}
     {props.group.group_image}
    </div>
  )

}

export default GroupImage; 