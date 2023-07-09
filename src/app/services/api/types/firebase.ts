import { User } from 'firebase/auth';

import { Nullable } from '#types/nullable';

export enum FirestoreCollections {
  Users = 'users',
  UserChats = 'user_chats',
}

export interface IFirebaseAuthResponse {
  user: Nullable<User>;
  error: Nullable<string>;
}

export interface IFirebaseRegisterData {
  nickname: string;
  email: string;
  password: string;
  avatar: Nullable<File>;
}

export interface IFirebaseLoginData {
  email: string;
  password: string;
}
