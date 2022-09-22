import Constants from 'expo-constants';
import {stringToBoolean} from './utils/parse';

export const DEV_RESTORE_NAV_STATE_ON_RELOAD = stringToBoolean(
  Constants.manifest?.extra?.DEV_RESTORE_NAV_STATE_ON_RELOAD || 'false',
);

export const AUTH0_DOMAIN = Constants.manifest?.extra?.AUTH0_DOMAIN;
export const AUTH0_PASSWORDLESS_AUDIENCE =
  Constants.manifest?.extra?.AUTH0_PASSWORDLESS_AUDIENCE;
export const AUTH0_CLIENT_ID = Constants.manifest?.extra?.AUTH0_CLIENT_ID;
export const HASURA_URL = Constants.manifest?.extra?.HASURA_URL;
