import React from 'react';
import PropTypes from 'prop-types';
import 'Ads/List/List.css';
import { Link } from 'react-router-dom';

const AdsList = props => {
  const { data, next } = props;
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>price</th>
            <th>category</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.ads.edges.map(ad => (
            <tr key={`ad-list-item-${ad.node.id}`}>
              <td>{ad.node.title}</td>
              <td>{ad.node.description}</td>
              <td>{ad.node.price}</td>
              <td>
                {ad.node.subcategory.parentCategory.name} /{' '}
                {ad.node.subcategory.name}
              </td>
              <td>{ad.node.status}</td>
              <td>
                <Link to={`/ad/${ad.node.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => next(data.ads.pageInfo.endCursor)}>
        Next
      </button>
    </div>
  );
};

AdsList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  next: PropTypes.func.isRequired,
};

export default AdsList;
