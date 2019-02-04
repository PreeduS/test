import * as React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'

import AppContainer from '../containers/App'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


export function App() {
  return (
    <ApolloProvider client = {client}>
      <AppContainer />
    </ApolloProvider>
  );
}