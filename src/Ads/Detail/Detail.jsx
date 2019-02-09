import React  from 'react';
import PropTypes from 'prop-types';
import 'Ads/List/List.css';
import { Link } from 'react-router-dom';

const AdsDetail = props => {
  const { data, remove } = props;
  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <td>{data.ad.title}</td>
          </tr>
          <tr>
            <th>description</th>
            <td>{data.ad.description}</td>
          </tr>
          <tr>
            <th>price</th>
            <td>{data.ad.price}</td>
          </tr>
          <tr>
            <th>category</th>
            <td>
              {data.ad.subcategory.parentCategory.name} /{' '}
              {data.ad.subcategory.name}
            </td>
          </tr>
          <tr>
            <th>name</th>
            <td>{data.ad.name}</td>
          </tr>
          <tr>
            <th>phone</th>
            <td>{data.ad.phone}</td>
          </tr>
          <tr>
            <th>email</th>
            <td>{data.ad.email}</td>
          </tr>
          <tr>
            <th>status</th>
            <td>{data.ad.status}</td>
          </tr>
          <tr>
            <th>action</th>
            <td>
              <Link to="/">List</Link>
              <button type="button" onClick={() => remove(data.ad.id)}>
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

AdsDetail.propTypes = {
  data: PropTypes.shape({}).isRequired,
  remove: PropTypes.func.isRequired,
};

export default AdsDetail;
