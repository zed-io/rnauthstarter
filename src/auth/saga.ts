import Auth0 from 'react-native-auth0';
import {call, select, takeLatest} from 'redux-saga/effects';
import {e146PhoneNumberSelector} from '../app/selectors';
import {Actions as AppActions} from '../app/actions';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from '../config';

const AUTH0_RETRIES = 1;
const FIREBASE_RETRIES = 3;

function* initiateAuth0Text() {
  const phoneNumber = yield select(e146PhoneNumberSelector);

  if (!phoneNumber) {
    return;
  }

  const auth0 = new Auth0({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
  });

  if (!auth0) {
    return;
  }

  try {
    yield call(auth0.auth.passwordlessWithSMS, {phoneNumber});
  } catch (error) {
    console.error('Unable to send Auth0 authorization code', error);
  }
}

export function* authSaga() {
  yield takeLatest(AppActions.SET_PHONE_NUMBER, initiateAuth0Text);
}
