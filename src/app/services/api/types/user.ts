import { ApiResponse } from 'apisauce';

import { IUser } from '#models';
import { ErrorResponse } from '#types/api';

export type ApiLoginUserBody = {
  username: string;
  password: string;
};

export type ApiLoginUserSuccessResponse = IUser;

export type ApiLoginUserResponse = ApiResponse<ApiLoginUserSuccessResponse, ErrorResponse>;
