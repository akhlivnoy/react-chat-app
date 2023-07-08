// Entity interface that matches actual API typing
export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface IUserLoginData {
  username: string;
  password: string;
}
