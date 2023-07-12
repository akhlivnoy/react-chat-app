import { ActionCreatorWithPayload, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { ErrorType, LoadingType } from '#redux/types';
import { Nullable } from '#types/nullable';

import { userSlice } from './userSlice';

export interface IAppState {
  loading: Record<LoadingType, boolean>;
  errors: Record<ErrorType, Nullable<string>>;
}

const INITIAL_STATE: IAppState = {
  loading: {
    isLoginUser: false,
    isRegisterUser: false,
    isSearchUser: false,
  },
  errors: {
    loginUser: null,
    registerUser: null,
    searchUser: null,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setError(state, { payload: { error, errorType } }: PayloadAction<{ errorType: ErrorType; error: string }>) {
      state.errors[errorType] = error;
    },
    resetErrors(state) {
      state.errors = _.cloneDeep(INITIAL_STATE.errors);
    },
  },
  extraReducers: builder => {
    const addCases = (
      [actionRequest, actionSuccess, actionError]: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ActionCreatorWithPayload<any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ActionCreatorWithPayload<any>,
        ActionCreatorWithPayload<string, string>,
      ],
      loadingType: LoadingType,
      errorType: ErrorType,
    ) => {
      builder.addCase(actionRequest, state => {
        state.loading[loadingType] = true;
        state.errors[errorType] = null;
      });
      builder.addCase(actionSuccess, state => {
        state.loading[loadingType] = false;
      });
      builder.addCase(actionError, (state, action) => {
        state.loading[loadingType] = false;
        state.errors[errorType] = action.payload;
      });
    };

    // Login actions
    addCases(
      [userSlice.actions.loginUser, userSlice.actions.loginUserSuccess, userSlice.actions.loginUserError],
      LoadingType.isLoginUser,
      ErrorType.loginUser,
    );

    // Register actions
    addCases(
      [userSlice.actions.registerUser, userSlice.actions.registerUserSuccess, userSlice.actions.registerUserError],
      LoadingType.isRegisterUser,
      ErrorType.registerUser,
    );

    // Search actions
    addCases(
      [userSlice.actions.searchUser, userSlice.actions.searchUserSuccess, userSlice.actions.searchUserError],
      LoadingType.isSearchUser,
      ErrorType.searchUser,
    );
  },
});
