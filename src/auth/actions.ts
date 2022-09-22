import {Auth0AuthorizationResponse} from './types';

export enum Actions {
  SET_ACCESS_TOKEN = 'AUTH/SET_ACCESS_TOKEN',
}

export interface SetAccessToken {
  type: Actions.SET_ACCESS_TOKEN;
  authorizationToken: Auth0AuthorizationResponse;
}

export const setAccessToken = (
  authorizationToken: Auth0AuthorizationResponse,
): SetAccessToken => ({
  type: Actions.SET_ACCESS_TOKEN,
  authorizationToken,
});

export type ActionTypes = SetAccessToken;
