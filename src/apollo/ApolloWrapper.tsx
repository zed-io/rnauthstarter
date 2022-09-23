import React, {useMemo, useRef} from 'react';
import {useSelector} from 'react-redux';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {authorizationTokenSelector} from '../auth/selectors';
import {setContext} from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import {HASURA_URL} from '../config';
import {getMainDefinition} from '@apollo/client/utilities';

const ApolloWrapper = (props: any) => {
  const {accessToken} = useSelector(authorizationTokenSelector) || {};
  const tokenRef = useRef<string>();

  tokenRef.current = accessToken;

  const Client = useMemo(() => {
    // @note Link used for state-less operations
    const httpLink = createHttpLink({
      uri: `http://${HASURA_URL}`,
    });

    // @note Link used for WebSocket operations
    const wsLink = new GraphQLWsLink(
      createClient({
        url: `ws://${HASURA_URL}`,
        connectionParams: {
          headers: {
            Authorization: tokenRef.current
              ? `Bearer ${tokenRef.current}`
              : null,
          },
        },
      }),
    );

    const authLink = setContext((_, {headers}) => {
      // @note Return headers to context
      return {
        headers: {
          ...headers,
          Authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : null,
        },
      };
    });

    const splitLink = split(
      ({query}) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      authLink.concat(httpLink),
    );

    const apolloClient = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });

    return apolloClient;
  }, [tokenRef]);

  return <ApolloProvider client={Client} {...props} />;
};

export default ApolloWrapper;
