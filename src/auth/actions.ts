import {Auth0AuthorizationResponse} from './types';

export enum Actions {
  SET_ACCESS_TOKEN = 'AUTH/SET_ACCESS_TOKEN',
  INVALIDATE_ACCESS_TOKEN = 'AUTH/INVALIDATE_ACCESS_TOKEN',
}

export interface SetAccessToken {
  type: Actions.SET_ACCESS_TOKEN;
  authorizationToken: Auth0AuthorizationResponse;
}

export interface InvalidateAccessToken {
  type: Actions.INVALIDATE_ACCESS_TOKEN;
}

export const setAccessToken = (
  authorizationToken: Auth0AuthorizationResponse,
): SetAccessToken => ({
  type: Actions.SET_ACCESS_TOKEN,
  authorizationToken,
});

export const invalidateAccessToken = (): InvalidateAccessToken => ({
  type: Actions.INVALIDATE_ACCESS_TOKEN,
});

export type ActionTypes = SetAccessToken;
