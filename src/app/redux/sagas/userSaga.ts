import { call, put, takeLatest } from 'redux-saga/effects';

import { IUser } from '#models';
import { Paths } from '#navigation/routes';
import { userSlice } from '#redux/slices';
import { LoginUserAction, RegisterUserAction } from '#redux/types';
import { apiInstance } from '#services/api';
import { IFirebaseAuthResponse } from '#services/api/types';
import { StaticNavigator } from '#services/navigator';

function* registerUserWorker({ payload }: RegisterUserAction) {
  const registerUserResponse: IFirebaseAuthResponse = yield call(apiInstance.firebase.registerUser, payload);
  if (!registerUserResponse.error && registerUserResponse.user) {
    const user: IUser = {
      avatarUrl: registerUserResponse.user.photoURL ?? '',
      email: registerUserResponse.user.email ?? '',
      nickname: registerUserResponse.user.displayName ?? '',
      uid: registerUserResponse.user.uid,
    };

    yield put(userSlice.actions.registerUserSuccess(user));

    StaticNavigator.navigate(Paths.Root);
  }

  if (registerUserResponse.error) {
    yield put(userSlice.actions.registerUserError(registerUserResponse.error));
  }
}

function* loginUserWorker({ payload }: LoginUserAction) {
  const loginUserResponse: IFirebaseAuthResponse = yield call(apiInstance.firebase.loginUser, payload);

  if (!loginUserResponse.error && loginUserResponse.user) {
    const user: IUser = {
      avatarUrl: loginUserResponse.user.photoURL ?? '',
      email: loginUserResponse.user.email ?? '',
      nickname: loginUserResponse.user.displayName ?? '',
      uid: loginUserResponse.user.uid,
    };

    yield put(userSlice.actions.loginUserSuccess(user));

    StaticNavigator.navigate(Paths.Root);
  }

  if (loginUserResponse.error) {
    yield put(userSlice.actions.loginUserError(loginUserResponse.error));
  }
}

export function* userSaga() {
  yield takeLatest(userSlice.actions.registerUser, registerUserWorker);
  yield takeLatest(userSlice.actions.loginUser, loginUserWorker);
}
