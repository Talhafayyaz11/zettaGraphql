import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import React from 'react';
import { render } from 'react-dom';
import { API_URL } from './environment'
import Landing from './components/Landing';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
});

const application = (
  <ApolloProvider client={client}>
    <Landing />
  </ApolloProvider>
);

render(application, document.querySelector('#app'));
