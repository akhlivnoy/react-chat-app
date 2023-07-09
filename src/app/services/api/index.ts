import apisauce, { ApisauceInstance } from 'apisauce';

import { firebaseApi } from './firebase';

export const apiClient: ApisauceInstance = apisauce.create({
  baseURL: 'https://dummyjson.com/auth/login',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const apiInstance = {
  firebase: firebaseApi,
};
