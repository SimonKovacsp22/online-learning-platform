export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role: string;
  createDt: string;
  authStatus: string;
}

export class User implements IUser {
  id = 0;
  email = '';
  firstName = '';
  lastName = '';
  password? = '';
  role = '';
  createDt = '';
  authStatus = '';
  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    role?: string,
    statusCd?: string,
    statusMsg?: string,
    authStatus?: string
  ) {
    this.id = id || 0;
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.password = password || '';
    this.role = role || '';
    this.authStatus = authStatus || '';
  }
}
