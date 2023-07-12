import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IUserChat, IUserInfo } from '#models';
import { LoginUserAction, RegisterUserAction } from '#redux/types';
import { Nullable } from '#types/nullable';

export interface IUserState {
  user: Nullable<IUser>;
  searchedUsers: ReadonlyArray<IUser>;
  chat: Nullable<IUserChat>;
}

const INITIAL_STATE: IUserState = {
  user: null,
  searchedUsers: [],
  chat: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    loginUser(state, action: LoginUserAction) {},
    loginUserSuccess(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
    },
    loginUserError(state, action: PayloadAction<string>) {},

    registerUser(state, action: RegisterUserAction) {},
    registerUserSuccess(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
    },
    registerUserError(state, action: PayloadAction<string>) {},

    searchUser(state, action: PayloadAction<string>) {},
    searchUserSuccess(state, { payload }: PayloadAction<IUser[]>) {
      state.searchedUsers = payload;
    },
    searchUserError(state, action: PayloadAction<string>) {},
    clearSearchedUser(state) {
      state.searchedUsers = [];
    },

    getInterlocutor(state, action: PayloadAction<IUserInfo>) {},
    getInterlocutorSuccess(state, { payload }: PayloadAction<IUserChat>) {
      state.chat = payload;
    },
    getInterlocutorError(state, action: PayloadAction<string>) {},

    logout() {
      return INITIAL_STATE;
    },
  },
});
