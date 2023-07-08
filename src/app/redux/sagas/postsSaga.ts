import { call, put, takeLatest } from 'redux-saga/effects';

import { IPost } from '#models';
import { postsSlice } from '#redux/slices';
import { GetPostsAction } from '#redux/types';
import { apiInstance } from '#services/api';
import { ApiGetPostsResponse } from '#services/api/types';

function* getPostsWorker({ payload: { limit } }: GetPostsAction) {
  const response: ApiGetPostsResponse = yield call(apiInstance.posts.getPosts, limit);

  if (response.ok && response.data) {
    yield put(postsSlice.actions.getPostsSuccess(response.data.posts));
  } else {
    // TODO: error from backend side
    yield put(postsSlice.actions.getPostsError('Login error'));
  }
}

export function* postsSaga() {
  yield takeLatest(postsSlice.actions.getPosts, getPostsWorker);
}
