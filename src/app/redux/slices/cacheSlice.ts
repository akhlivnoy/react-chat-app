import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICacheState {
  isChatOpened: boolean;
}

const INITIAL_STATE: ICacheState = {
  isChatOpened: false,
};

export const cacheSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setIsChatOpened(state, { payload }: PayloadAction<boolean>) {
      state.isChatOpened = payload;
    },
  },
});
