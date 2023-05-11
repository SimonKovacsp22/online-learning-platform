import { IUser } from './user.model';

export interface IRating {
  id: number;
  user: IUser;
  amount: number;
  message: string;
  createdAt: Date;
}
