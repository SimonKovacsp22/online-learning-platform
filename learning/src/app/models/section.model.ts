import { IVideo } from './video.model';

export interface ISection {
  id?: number;
  title: string;
  rank: number;
  course_id?: number;
  videos: IVideo[];
}

export class Section implements ISection {
  constructor(title: string, rank: number, id?: number) {
    this.id = id;
    this.title = title;
    this.videos = [];
    this.rank = rank;
  }
  rank: number;
  course_id?: number | undefined;
  videos: IVideo[];
  title: string;
  id?: number;
}
