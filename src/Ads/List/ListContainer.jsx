import React, { Component } from 'react';
import 'Ads/List/List.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AdsList from './List';

/**
 * Query to fetch users from api
 */
export const ADS_QUERY = gql`
  query AdList($first: Int, $after: String, $last: Int, $before: String) {
    ads(first: $first, after: $after, last: $last, before: $before) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          id
          title
          description
          price
          subcategory {
            name
            parentCategory {
              name
            }
          }
          status
        }
        cursor
      }
    }
  }
`;

class AdsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      after: '',
    };
  }

  handlerNext = cursor => {
    this.setState({ after: cursor });
  };

  render() {
    const { after } = this.state;
    return (
      <Query
        query={ADS_QUERY}
        variables={{
          first: 3,
          after,
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading }) =>
          loading ? 'Loading' : <AdsList data={data} next={this.handlerNext} />
        }
      </Query>
    );
  }
}

export default AdsListContainer;
