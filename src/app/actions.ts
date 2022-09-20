import {AppState} from './types';

export enum Actions {
  SET_APP_STATE = 'APP/SET_APP_STATE',
  SET_PHONE_NUMBER = 'APP/SET_PHONE_NUMBER',
}

export interface SetAppState {
  type: Actions.SET_APP_STATE;
  state: string;
}

export interface SetE146PhoneNumber {
  type: Actions.SET_PHONE_NUMBER;
  e146phoneNumber: string;
}

export const setAppState = (state: AppState) => ({
  type: Actions.SET_APP_STATE,
  state,
});

export const setE146PhoneNumber = (e146phoneNumber: string) => ({
  type: Actions.SET_PHONE_NUMBER,
  e146phoneNumber,
});

export type ActionTypes = SetAppState;
