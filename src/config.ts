import Constants from 'expo-constants';
import {stringToBoolean} from './utils/parse';

export const DEV_RESTORE_NAV_STATE_ON_RELOAD = stringToBoolean(
  Constants.manifest.extra.DEV_RESTORE_NAV_STATE_ON_RELOAD || 'false',
);

export const AUTH0_DOMAIN = Constants.manifest.extra.AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = Constants.manifest.extra.AUTH0_CLIENT_ID;
