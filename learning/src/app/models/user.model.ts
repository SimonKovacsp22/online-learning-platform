import { IProgress } from './progress.model';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  pwd?: string;
  role: string;
  avatar: string;
  createDt?: string;
  authStatus?: string;
  progresses?: IProgress[];
}

export class User implements IUser {
  id = 0;
  email = '';
  firstName = '';
  lastName = '';
  password? = '';
  pwd? = '';
  role = '';
  avatar = '';
  createDt = '';
  authStatus = '';
  progresses = [];
  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    role?: string,
    authStatus?: string,
    pwd?: string,
    progresses?: IProgress[]
  ) {
    this.id = id || 0;
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.password = password || '';
    this.pwd = pwd || '';
    this.role = role || '';
    this.authStatus = authStatus || '';
  }
}
