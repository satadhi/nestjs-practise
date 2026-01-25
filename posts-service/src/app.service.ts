import { Injectable } from '@nestjs/common';
import { addPostRequest } from './dto/addpost-request';

@Injectable()
export class AppService {
  async addPosts(body: addPostRequest): Promise<addPostRequest> {
    return body;
  }
}
