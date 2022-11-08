import { all } from 'redux-saga/effects';
import { add } from './counter';

export default function* rootSaga() {
  yield all([add()]);
}
