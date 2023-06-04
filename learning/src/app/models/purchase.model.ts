import { OrderItem } from './order-item.mode';
import { IUser } from './user.model';

export interface IPurchase {
  email: string;
  orderItems: OrderItem[];
}

export class Purchase implements IPurchase {
  constructor(public email: string, public orderItems: OrderItem[]) {}
}
