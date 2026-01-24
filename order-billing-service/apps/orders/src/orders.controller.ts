import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() request: CreateOrderRequest): string {
    return this.ordersService.createOrder();
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
}
