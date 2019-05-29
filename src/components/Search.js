import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = ({ client }) => {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = ({ target }) => setFilter(target.value);

  const executeSearch = async () => {
    const { data } = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    setLinks(data.feed.links);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={filter}
          placeholder="Search..."
          onChange={handleFilterChange}
        />
        <button onClick={executeSearch}>Go</button>
      </div>
      {links.map((link, i) => (
        <Link key={link.id} link={link} index={i} />
      ))}
    </div>
  );
};

export default withApollo(Search);
