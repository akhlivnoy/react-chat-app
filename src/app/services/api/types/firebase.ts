import { User } from 'firebase/auth';
import { Unsubscribe } from 'firebase/database';

import { IMessage, IUser, IUserChat } from '#models';
import { Nullable } from '#types/nullable';

export enum FirebasePaths {
  Avatars = 'avatars',
  Attachments = 'attachments',
  Chats = 'chats',
  Users = 'users',
  UserChats = 'user_chats',
  Messages = 'messages',
}

export interface IFirebaseAuthResponse {
  user: Nullable<User>;
  error: Nullable<string>;
}

export interface IFirebaseSearchResponse {
  users: IUser[];
  error: Nullable<string>;
}

export interface IFirebaseGetUserChatResponse {
  chat: Nullable<IUserChat>;
  error: Nullable<string>;
}

export interface IFirebaseGetUserChatsResponse {
  chats: IUserChat[];
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

export interface IFirebaseGetMessagesResponse {
  messages: IMessage[];
  unsubscribe: Nullable<Unsubscribe>;
  error: Nullable<string>;
}
