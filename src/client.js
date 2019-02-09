import ApolloClient from 'apollo-boost';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});
