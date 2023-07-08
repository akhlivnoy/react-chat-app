import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPost } from '#models';
import { GetPostsAction } from '#redux/types';

import { userSlice } from './userSlice';

export interface IPostsState {
  posts: IPost[];
}

const INITIAL_STATE: IPostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: INITIAL_STATE,
  reducers: {
    getPosts(state, action: GetPostsAction) {},

    getPostsSuccess(state, { payload }: PayloadAction<IPost[]>) {
      state.posts = payload;
    },

    getPostsError(state, action: PayloadAction<string>) {},
  },
  extraReducers: builder => {
    builder.addCase(userSlice.actions.logout, state => {
      state.posts = [];
    });
  },
});
