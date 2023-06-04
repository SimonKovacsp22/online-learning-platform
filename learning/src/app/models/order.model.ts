export interface IOrder {
  totalPrice: number;
}

export class Order implements IOrder {
  constructor() {
    this.totalPrice = 0;
  }

  totalPrice: number;
}
