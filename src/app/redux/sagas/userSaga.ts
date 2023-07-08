import { call, put, takeLatest } from 'redux-saga/effects';

import { Paths } from '#navigation/routes';
import { userSlice } from '#redux/slices';
import { GetUserListAction, LoginUserAction } from '#redux/types';
import { apiInstance } from '#services/api';
import { ApiGetUserListResponse, ApiLoginUserBody, ApiLoginUserResponse } from '#services/api/types';
import { StaticNavigator } from '#services/navigator';

function* loginUserWorker({ payload: { password, username } }: LoginUserAction) {
  const body: ApiLoginUserBody = {
    password,
    username,
  };
  const response: ApiLoginUserResponse = yield call(apiInstance.user.loginUser, body);

  if (response.ok && response.data) {
    yield put(userSlice.actions.loginUserSuccess(response.data));

    StaticNavigator.navigate(Paths.Posts);
  } else {
    // TODO: error from backend side
    yield put(userSlice.actions.loginUserError('Login error'));
  }
}

function* getUserListWorker({ payload: { limit } }: GetUserListAction) {
  const response: ApiGetUserListResponse = yield call(apiInstance.user.getUserList, limit);

  if (response.ok && response.data) {
    yield put(userSlice.actions.getUserListSuccess(response.data));
  } else {
    // TODO: error from backend side
    yield put(userSlice.actions.loginUserError('Login error'));
  }
}

export function* userSaga() {
  yield takeLatest(userSlice.actions.loginUser, loginUserWorker);
  yield takeLatest(userSlice.actions.getUserList, getUserListWorker);
}
