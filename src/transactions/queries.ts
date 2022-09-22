import React from 'react';
import {gql, useQuery} from '@apollo/client';

export const ALL_TRANSACTIONS_QUERY = gql`
  query GetAllTransactions {
    transactions {
      amount
      currency
      id
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
    }
  }
`;

export const useAllTransactions = () => {
  const {loading, error, data} = useQuery(ALL_TRANSACTIONS_QUERY, {});
  return {loading, error, data};
};

export const useAllUsers = () => {
  const {loading, error, data} = useQuery(ALL_USERS_QUERY, {});
  return {loading, error, data};
};
