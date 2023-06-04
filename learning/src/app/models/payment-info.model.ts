import { OrderItem } from './order-item.mode';

export class PaymentInfo {
  constructor(
    public orderItems: OrderItem[],
    public receiptEmail: string,
    public amount?: number,
    public currency?: string
  ) {}
}
