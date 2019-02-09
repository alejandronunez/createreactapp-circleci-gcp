import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'Ads/List/List.css';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import RouterContext from 'routerContext';
import AdsDetail from './Detail';

/**
 * Query to fetch users from api
 */
export const AD_QUERY = gql`
  query AdDetail($id: Int!) {
    ad(id: $id) {
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
      name
      email
      phone
      status
    }
  }
`;

export const REMOVE_AD_MUTATION = gql`
  mutation($id: ID!) {
    removeAd(input: { id: $id }) {
      ad {
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
        name
        email
        phone
        status
      }
    }
  }
`;

class AdsDetailContainer extends Component {
  static contextType = RouterContext;

  constructor(props) {
    super(props);
    this.Compose = adopt({
      mutateRemove: this.remove,
      query: this.query,
    });
  }

  remove = ({ render }) => {
    const { push } = this.context;
    return (
      <Mutation mutation={REMOVE_AD_MUTATION} onCompleted={() => push('/')}>
        {(handleRemove, { loading }) =>
          render({ handleRemove, loadingRemove: loading })
        }
      </Mutation>
    );
  };

  query = ({ render }) => {
    const { match } = this.props;
    return (
      <Query
        query={AD_QUERY}
        variables={{
          id: match.params.id,
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading }) => render({ data, loading })}
      </Query>
    );
  };

  render() {
    return (
      <this.Compose>
        {({
          mutateRemove: { handleRemove, loadingRemove },
          query: { data, loading },
        }) =>
          loading || loadingRemove ? (
            'Loading'
          ) : (
            <AdsDetail
              data={data}
              remove={id => handleRemove({ variables: { id } })}
            />
          )
        }
      </this.Compose>
    );
  }
}

AdsDetailContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default AdsDetailContainer;
