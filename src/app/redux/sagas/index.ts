import { all } from 'redux-saga/effects';

import { postsSaga } from './postsSaga';
import { userSaga } from './userSaga';

export function* rootSaga() {
  yield all([postsSaga(), userSaga()]);
}
