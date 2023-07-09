import { PayloadAction } from '@reduxjs/toolkit';

import { IFirebaseLoginData, IFirebaseRegisterData } from '#services/api/types';

export type RegisterUserAction = PayloadAction<IFirebaseRegisterData>;

export type LoginUserAction = PayloadAction<IFirebaseLoginData>;
