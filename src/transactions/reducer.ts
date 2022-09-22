import {
  getRehydratePayload,
  REHYDRATE,
  RehydrateAction,
} from '../redux/persist-helper';
import {Actions, ActionTypes} from './actions';
import {Transaction} from './types';

export interface State {
  transactions: Transaction[];
}

const initialState: State = {
  transactions: [],
};

export const reducer = (
  state: State | undefined = initialState,
  action: ActionTypes | RehydrateAction,
): State => {
  switch (action.type) {
    case REHYDRATE: {
      const rehydratePayload = getRehydratePayload(action, 'app');
      return {
        ...state,
        ...rehydratePayload,
      };
    }
    case Actions.ADD_TRANSACTION: {
      return {
        ...state,
        transactions: [action.transaction, ...state.transactions],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
