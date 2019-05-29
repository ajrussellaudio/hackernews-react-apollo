import React from 'react';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';
import { Mutation } from 'react-apollo';

const voteMutation = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = ({ link, index, updateStoreAfterVote }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const handleUpdate = (store, { data }) =>
    updateStoreAfterVote(store, data.vote, link.id);

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={voteMutation}
            variables={{ linkId: link.id }}
            update={handleUpdate}
          >
            {mutation => (
              <div className="ml1 gray f11 pointer" onClick={mutation}>
                ▲
              </div>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes ? link.votes.length : 'XX'} votes | by{' '}
          {link.postedBy ? link.postedBy : 'Unknown'}{' '}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;
