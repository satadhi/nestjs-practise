import { Injectable } from '@nestjs/common';
import { addPostRequest } from './dto/addpost-request';
import { AppRepository } from './app.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly repo: AppRepository) {}
  async addPosts(body: addPostRequest) {
    const data: Prisma.PostCreateInput = {
      title: body.title,
      content: body.content,
      author: {
        connect: { id: body.id },
      },
    };
    return this.repo.addPost(data);
  }
}
