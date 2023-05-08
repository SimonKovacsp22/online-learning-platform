import { ICategory } from './category.model';
import { IUser } from './user.model';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  user: IUser;
  categories: ICategory[];
}
