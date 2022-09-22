import {RootState} from '../redux/reducers';
import {Auth0AuthorizationResponse} from './types';

export const authorizationTokenSelector = (
  state: RootState,
): Auth0AuthorizationResponse => state.auth.authorizationToken;
