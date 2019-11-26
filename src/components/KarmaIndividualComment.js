import React from 'react';
import { Comment } from 'semantic-ui-react'

const KarmaIndividualComment =(props) => {
  return (
    <div>
      <div>
        <Comment.Content>
          <Comment.Text>
            <Comment.Group size='large'>
            {props.karma.content}
            </Comment.Group>
          </Comment.Text>
        </Comment.Content>
      </div>
      <div>{props.karma.user_id}</div>
    </div>
  )

}

export default KarmaIndividualComment; 