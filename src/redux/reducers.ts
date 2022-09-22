import {Action, combineReducers} from 'redux';
import {PersistState} from 'redux-persist';
import {reducer as app, State as AppState} from 'src/app/reducers';
import {reducer as auth, State as AuthState} from 'src/auth/reducer';
import {
  reducer as transactions,
  State as TransactionState,
} from 'src/transactions/reducer';

export interface RootState {
  _persist: PersistState;
  app: AppState;
  transactions: TransactionState;
  auth: AuthState;
}

export interface PersistedRootState {
  _persist: PersistState;
  app: AppState;
  transactions: TransactionState;
  auth: AuthState;
}

const appReducer = combineReducers({
  app: app,
  auth: auth,
  transactions: transactions,
}) as (state: RootState | undefined, action: Action) => RootState;

const rootReducer = (
  state: RootState | undefined,
  action: Action,
): RootState => {
  if (false) {
    const initialState = appReducer(undefined, action);
    return {
      ...initialState,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
