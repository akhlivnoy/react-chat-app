import { IUserLoginData } from '#models';

export interface IUserListProps {
  data: IUserLoginData[];
  setIndex: (index: number) => void;
  className?: string;
}
