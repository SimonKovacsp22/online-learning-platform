import { ICourse } from './course.model';
import { IUser } from './user.model';

export interface ICart {
  id: number;
  active: boolean;
  courses: ICourse[];
  user: IUser;
}
