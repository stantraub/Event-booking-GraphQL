import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import "./App.css";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient, gql } from "apollo-boost";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

// client
// .query({
//   query: gql`
//     {
//       bookings {
//         _id
//       }
//     }
//   `
// }).then(res => console.log(res));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
