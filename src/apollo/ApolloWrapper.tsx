import React, {useMemo, useRef} from 'react';
import {useSelector} from 'react-redux';
import {authorizationTokenSelector} from '../auth/selectors';
import {setContext} from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import {HASURA_URL} from '../config';

const ApolloWrapper = (props: any) => {
  const {accessToken} = useSelector(authorizationTokenSelector) || {};
  const tokenRef = useRef<string>();

  tokenRef.current = accessToken;

  const Client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: HASURA_URL,
    });

    const authLink = setContext((_, {headers}) => {
      // @note Return headers to context
      return {
        headers: {
          ...headers,
          Authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : null,
        },
      };
    });

    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    return apolloClient;
  }, [tokenRef]);

  return <ApolloProvider client={Client} {...props} />;
};

export default ApolloWrapper;
