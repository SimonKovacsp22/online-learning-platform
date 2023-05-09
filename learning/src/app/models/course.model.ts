import { ICategory } from './category.model';
import { ILanguage } from './language.model';
import { IUser } from './user.model';
import { IWYWL } from './wywl.model';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  user: IUser;
  lastUpdated: Date;
  price: number;
  categories: ICategory[];
  students: IUser[];
  whatYouWillLearn: IWYWL[];
  languages: ILanguage[];
}
