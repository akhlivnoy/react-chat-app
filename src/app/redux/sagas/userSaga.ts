import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { IUser, IUserInfo } from '#models';
import { Paths } from '#navigation/routes';
import { userSlice } from '#redux/slices';
import { LoginUserAction, RegisterUserAction } from '#redux/types';
import { apiInstance } from '#services/api';
import {
  IFirebaseAuthResponse,
  IFirebaseGetUserChatResponse,
  IFirebaseGetUserChatsResponse,
  IFirebaseSearchResponse,
} from '#services/api/types';
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

function* searchUserWorker({ payload }: PayloadAction<string>) {
  const searchUserResponse: IFirebaseSearchResponse = yield call(apiInstance.firebase.searchUser, payload);

  if (!searchUserResponse.error && searchUserResponse.users) {
    yield put(userSlice.actions.searchUserSuccess(searchUserResponse.users));
  }

  if (searchUserResponse.error) {
    yield put(userSlice.actions.searchUserError(searchUserResponse.error));
  }
}

function* getInterlocutorWorker({ payload }: PayloadAction<IUserInfo>) {
  const getInterlocutorResponse: IFirebaseGetUserChatResponse = yield call(apiInstance.firebase.getUserChat, payload);

  if (!getInterlocutorResponse.error && getInterlocutorResponse.chat) {
    yield put(userSlice.actions.getInterlocutorSuccess(getInterlocutorResponse.chat));

    StaticNavigator.navigate(`${getInterlocutorResponse.chat.chatUid}`);
  }

  if (getInterlocutorResponse.error) {
    yield put(userSlice.actions.getInterlocutorError(getInterlocutorResponse.error));
  }
}

export function* userSaga() {
  yield takeLatest(userSlice.actions.registerUser, registerUserWorker);
  yield takeLatest(userSlice.actions.loginUser, loginUserWorker);
  yield takeLatest(userSlice.actions.searchUser, searchUserWorker);
  yield takeLatest(userSlice.actions.getInterlocutor, getInterlocutorWorker);
}
