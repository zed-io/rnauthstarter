import {AppState} from 'src/app/types';
import {
  getRehydratePayload,
  REHYDRATE,
  RehydrateAction,
} from 'src/redux/persist-helper';
import {Actions, ActionTypes} from 'src/app/actions';

export interface State {
  locked: boolean;
  requirePinOnAppOpen: boolean;
  minVersion: string | null;
  appState: AppState;
  e146phoneNumber: string | null;
}

const initialState = {
  locked: false,
  minVersion: null,
  appState: AppState.Active,
  requirePinOnAppOpen: false,
  e146phoneNumber: null,
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
        appState: initialState.appState,
        locked: rehydratePayload.requirePinOnAppOpen ?? initialState.locked,
      };
    }
    case Actions.SET_APP_STATE: {
      return {
        ...state,
        appState: action.state as AppState,
      };
    }
    case Actions.SET_PHONE_NUMBER: {
      return {
        ...state,
        e146phoneNumber: action.e146phoneNumber,
      };
    }
    default:
      return {...state};
  }
};
