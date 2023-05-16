import { IUser, User } from './user.model';

export interface IProgress {
  id: number;
  ratio: number;
  course: number;
}

export class Progress implements IProgress {
  id = 0;
  ratio = 0;
  course = 0;

  constructor(id: number, ratio: number) {
    this.id = id || 0;
    this.ratio = ratio;
  }
}
