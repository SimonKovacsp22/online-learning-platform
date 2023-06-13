import { IVideo } from './video.model';

export interface ISection {
  id?: number;
  title: string;
  rank?: number;
  course_id?: number;
  videos: IVideo[];
}

export class Section implements ISection {
  constructor(title: string, id?: number) {
    this.id = id;
    this.title = title;
    this.videos = [];
  }
  rank?: number | undefined;
  course_id?: number | undefined;
  videos: IVideo[];
  title: string;
  id?: number;
}
