import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { FEED_QUERY } from './LinkList';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = ({ history }) => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const handleUpdate = (store, { data: { post } }) => {
    const data = store.readQuery({ query: FEED_QUERY });
    data.feed.links.unshift(post);
    store.writeQuery({ query: FEED_QUERY, data });
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          type="text"
          className="mb2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="A description for the link"
        />
        <input
          type="text"
          className="mb2"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="The URL for the link"
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => history.push('/')}
        update={handleUpdate}
      >
        {postMutation => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default CreateLink;
