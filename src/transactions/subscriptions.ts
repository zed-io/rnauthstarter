import React from 'react';
import {gql, useSubscription} from '@apollo/client';

const ALL_TX_SUB = gql`
  subscription AllTransactionsSubscription {
    transactions(order_by: {created_at: desc}) {
      amount
      currency
      from {
        name
      }
      to {
        name
      }
      status
    }
  }
`;

export const useTxSubscription = () => {
  const {loading, data} = useSubscription(ALL_TX_SUB, {});
  return {loading, data};
};
