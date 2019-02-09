/* eslint-disable import/no-extraneous-dependencies */
const fetch = require('node-fetch');
const fs = require('fs');
const { introspectionQuery } = require('graphql/utilities');

fetch(process.env.REACT_APP_API_URL, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: introspectionQuery }),
})
  .then(res => res.json())
  .then(res => {
    fs.writeFileSync(
      'graphql.schema.json',
      JSON.stringify(res.data, null, 2),
      'utf-8',
    );
  });
