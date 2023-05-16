import { IVideo } from './video.model';

export interface ISection {
  id: number;
  title: string;
  rank: number;
  course_id: number;
  videos: IVideo[];
}
