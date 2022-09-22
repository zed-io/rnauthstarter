import {AnyAction} from 'redux';
import {spawn, takeEvery} from 'redux-saga/effects';
import {sleep} from 'src/utils/time';
import {Actions as AuthActions} from '../auth/actions';
import {authSaga} from '../auth/saga';
import {REHYDRATE} from './persist-helper';

let sagasFinishedLoading = false;

export const waitUntilSagasFinishLoading = async () => {
  while (!sagasFinishedLoading) {
    await sleep(1000);
  }
};

const LoggerBlocklist = [REHYDRATE];

function* loggerSaga() {
  yield takeEvery('*', (action: AnyAction) => {
    try {
      if (action?.type && LoggerBlocklist.includes(action.type)) {
        console.debug(
          'redux/saga@logger',
          `${action.type} (payload not logged)`,
        );
      } else {
        console.debug('redux/saga@logger', JSON.stringify(action));
      }
    } catch (err) {
      console.warn(
        'redux/saga@logger',
        'could not log action of type',
        action.type,
      );
    }
  });
}

export function* rootSaga() {
  try {
    // @todo Hook up submodule sagas
    yield spawn(loggerSaga);
    yield spawn(authSaga);
  } catch (error: any) {
    console.error('redux/saga', JSON.stringify(error));
  } finally {
    sagasFinishedLoading = true;
  }
}
