import {Transaction} from './types';

export enum Actions {
  ADD_TRANSACTION = 'TRX/ADD_TRANSACTION',
  FETCH_TRANSACTIONS = 'TRX/FETCH_TRANSACTIONS',
}

export interface AddTransaction {
  type: Actions.ADD_TRANSACTION;
  transaction: Transaction;
}

export interface FetchTransactions {
  type: Actions.FETCH_TRANSACTIONS;
}

export const addTransaction = (transaction: Transaction) => ({
  type: Actions.ADD_TRANSACTION,
  transaction,
});

export const FetchTransactions = () => ({
  type: Actions.FETCH_TRANSACTIONS,
});

export type ActionTypes = AddTransaction | FetchTransactions;
