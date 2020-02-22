import { delay } from 'redux-saga';
import {
  call, put, takeEvery, all,
  take, takeLatest
} from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello Sagas!');
}

export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' });
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
  // yield takeLatest('INCREMENT_ASYNC', incrementAsync);
  // for (let index = 0; index < 3; index++) {
  //   yield take('INCREMENT_ASYNC');
  // }
  // yield put({ type: 'INCREMENT' });
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ]);
}