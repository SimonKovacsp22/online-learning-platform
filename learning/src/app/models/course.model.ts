import { ICategory } from './category.model';
import { ILanguage } from './language.model';
import { IProgress } from './progress.model';
import { IRating } from './rating.model';
import { IUser, User } from './user.model';
import { IVideo } from './video.model';
import { IWYWL } from './wywl.model';

export interface ICourse {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  user: IUser;
  subtitle: string;
  lastUpdated: Date;
  price: number;
  ratings: IRating[];
  categories: ICategory[];
  students: IUser[];
  whatYouWillLearn: IWYWL[];
  languages: ILanguage[];
  videos: IVideo[];
}
