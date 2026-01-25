import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { addPostRequest } from './dto/addpost-request';

@Controller('v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  async addPosts(@Body() body: addPostRequest) {
    return await this.postService.addPosts(body);
  }
}
