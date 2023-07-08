import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IUserLoginData } from '#models';
import { GetUserListAction, LoginUserAction } from '#redux/types';
import { ApiGetUserListSuccessResponse, ApiLoginUserSuccessResponse } from '#services/api/types';
import { Nullable } from '#types/nullable';

export interface IUserState {
  user: Nullable<IUser>;
  userList: IUserLoginData[];
}

const INITIAL_STATE: IUserState = {
  user: null,
  userList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    loginUser(state, action: LoginUserAction) {},
    loginUserSuccess(state, { payload }: PayloadAction<ApiLoginUserSuccessResponse>) {
      state.user = payload;
    },
    loginUserError(state, action: PayloadAction<string>) {},

    getUserList(state, action: GetUserListAction) {},
    getUserListSuccess(state, { payload }: PayloadAction<ApiGetUserListSuccessResponse>) {
      state.userList = payload.users;
    },
    getUserListError(state, action: PayloadAction<string>) {},

    logout(state) {
      state.user = null;
    },
  },
});
