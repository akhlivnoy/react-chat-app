import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '#models';
import { LoginUserAction, RegisterUserAction } from '#redux/types';
import { Nullable } from '#types/nullable';

export interface IUserState {
  user: Nullable<IUser>;
}

const INITIAL_STATE: IUserState = {
  user: null,
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

    logout() {
      return INITIAL_STATE;
    },
  },
});
