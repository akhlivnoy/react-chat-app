import { PayloadAction } from '@reduxjs/toolkit';

export type GetPostsAction = PayloadAction<{
  limit: number;
}>;
