import { Without } from '#types/without';

export interface IUser {
  uid: string;
  avatarUrl: string;
  email: string;
  nickname: string;
  alias?: string;
}

export interface IUserChat {
  interlocutorInfo: IUserInfo;
  lastUpdate: string;
  lastMessage: string;
  chatUid: string;
}

export type IUserInfo = Without<IUser, 'email'>;

export interface IMessage {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
  imgUrl?: string;
}
