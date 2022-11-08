import { delay, put, takeEvery } from 'redux-saga/effects';

function* increase() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

export function* add() {
  yield takeEvery('INCREMENT_ASYNC', increase);
}
