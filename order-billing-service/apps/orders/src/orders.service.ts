import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  async getOrders() {
    return this.ordersRepository.find({});
  }
}
