import {
  RehydrateAction,
  REHYDRATE,
  getRehydratePayload,
} from 'src/redux/persist-helper';
import {ActionTypes} from 'src/actions';
import {Actions} from './actions';

export interface State {
  auth0Authorized: boolean;
  firebaseAuthorized: boolean;
}

const initialState: State = {
  auth0Authorized: false,
  firebaseAuthorized: false,
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
    case Actions.AUTH0_AUTHORIZED: {
      return {
        ...state,
        auth0Authorized: true,
      };
    }
    case Actions.FIREBASE_AUTHORIZED: {
      return {
        ...state,
        firebaseAuthorized: true,
      };
    }
    default: {
      return {...state};
    }
  }
};
