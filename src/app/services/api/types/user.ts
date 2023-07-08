import { ApiResponse } from 'apisauce';

import { IUser, IUserLoginData } from '#models';
import { ErrorResponse } from '#types/api';

export type ApiLoginUserBody = {
  username: string;
  password: string;
};

export type ApiLoginUserSuccessResponse = IUser;

export type ApiLoginUserResponse = ApiResponse<ApiLoginUserSuccessResponse, ErrorResponse>;

export type ApiGetUserListSuccessResponse = {
  users: IUserLoginData[];
  total: number;
  skip: number;
  limit: number;
};

export type ApiGetUserListResponse = ApiResponse<ApiGetUserListSuccessResponse, ErrorResponse>;
