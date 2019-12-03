import React from 'react';
import { Comment, Header } from 'semantic-ui-react'
import moment from 'moment';

const KarmaIndividualComment =(props) => {
  
  return (
    <div>
      <div>
      <Comment.Group size='large'>
          <Header as ='h3' dividing></Header>
        <Comment> 
          {/* <Comment.Avatar src={props.templateImageForKarma()}/> */}
          <Comment.Avatar src={props.karma.picture_of_giver}/>
          <Comment.Content>
              <Comment.Author>{props.karma.from}</Comment.Author>
              <Comment.Metadata><div>{moment(props.karma.created_at).format('llll')}</div></Comment.Metadata>
              <Comment.Text>
                {props.karma.content}
              </Comment.Text>
          </Comment.Content>
        </Comment>
        </Comment.Group>
      </div>
    </div>
  )
}

export default KarmaIndividualComment; 