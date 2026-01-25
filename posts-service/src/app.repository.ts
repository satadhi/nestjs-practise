import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class AppRepository {
  constructor(private readonly db: DatabaseService) {}

  async addPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.db.post.create({
      data,
    });
  }
}
