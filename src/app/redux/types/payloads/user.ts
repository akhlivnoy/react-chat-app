import { PayloadAction } from '@reduxjs/toolkit';

export type LoginUserAction = PayloadAction<{
  username: string;
  password: string;
}>;

export type GetUserListAction = PayloadAction<{
  limit: number;
}>;
