import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class TagsService {
  constructor(private readonly databaseService: DatabaseService) {

  }

  async create(tagCreateInputDto: Prisma.TagCreateInput) {
    return this.databaseService.tag.create({ data: tagCreateInputDto });
  }

  findAll() {
    return this.databaseService.tag.findMany({});
  }

  findOne(id: number) {
    return this.databaseService.tag.findUnique(
      {
        where: {
          id,
        }
      }
    );
  }

  update(id: number, tagUpdateInputDto: Prisma.TagUpdateInput) {
    return this.databaseService.tag.update({
      where: {
        id
      },
      data: tagUpdateInputDto
    });
  }

  remove(id: number) {
    return this.databaseService.tag.delete({
      where: {
        id
      }
    });
  }
}
