import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { addPostRequest } from './dto/addpost-request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-post')
  async addPosts(@Body() body: addPostRequest) {
    return await this.appService.addPosts(body);
  }
}
