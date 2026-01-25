import { Injectable } from '@nestjs/common';
import { addPostRequest } from './dto/addpost-request';
import { PostRepository } from './post.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly repo: PostRepository) {}
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
