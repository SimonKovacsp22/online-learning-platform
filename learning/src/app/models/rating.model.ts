import { IUser } from './user.model';

export interface Rating {
  id: number;
  user: IUser;
  amount: number;
  message: string;
  createdAt: Date;
}
