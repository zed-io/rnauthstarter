import {
  RehydrateAction,
  REHYDRATE,
  getRehydratePayload,
} from 'src/redux/persist-helper';
import {ActionTypes} from 'src/actions';
import {Actions} from './actions';
import {Auth0AuthorizationResponse} from './types';

export interface State {
  auth0Authorized: boolean;
  firebaseAuthorized: boolean;
  authorizationToken: Auth0AuthorizationResponse | null;
}

const initialState: State = {
  auth0Authorized: false,
  firebaseAuthorized: false,
  authorizationToken: null,
};

export const reducer = (
  state: State | undefined = initialState,
  action: ActionTypes | RehydrateAction,
): State => {
  switch (action.type) {
    case REHYDRATE: {
      const rehydratePayload = getRehydratePayload(action, 'auth');
      return {
        ...state,
        ...rehydratePayload,
      };
    }
    case Actions.SET_ACCESS_TOKEN: {
      return {
        ...state,
        authorizationToken: action.authorizationToken,
      };
    }
    case Actions.INVALIDATE_ACCESS_TOKEN: {
      return {
        ...state,
        authorizationToken: null,
      };
    }
    default: {
      return {...state};
    }
  }
};
