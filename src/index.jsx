import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import App from './App';
import ThemeProvider from './Shared/ThemeProvider';
import { AuthProvider } from './Session/AuthContext';

import './style.scss';

const API_BASE_URL = 'http://localhost:8000/graphql';

const httpLink = new HttpLink({ uri: API_BASE_URL });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  console.log('authLink - token i localStorage:', token ? 'finns' : 'saknas');
  return {
    headers: {
      ...headers,
      ...(token ? { 'x-token': token } : {}),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      const isAuthError = message === 'Not authenticated as user.'
        || message === 'Your session expired. Sign in again.';
      if (isAuthError && localStorage.getItem('token')) {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('auth-error'));
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </ApolloProvider>,
);

// registerServiceWorker();
