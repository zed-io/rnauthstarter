import {call, select, takeLatest} from 'redux-saga/effects';
import {e146PhoneNumberSelector} from '../app/selectors';
import {Actions as AppActions} from '../app/actions';
import {auth0} from './init';

const AUTH0_RETRIES = 1;
const FIREBASE_RETRIES = 3;

function* initiateAuth0Text(): any {
  const phoneNumber = yield select(e146PhoneNumberSelector);
  if (!phoneNumber) {
    return;
  }
}

export function* authSaga() {
  yield takeLatest(AppActions.SET_PHONE_NUMBER, initiateAuth0Text);
}
