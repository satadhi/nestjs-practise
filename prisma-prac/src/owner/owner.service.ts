import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnerService {
  constructor(private readonly databaseService: DatabaseService) {

  }

  async create(createProductDto: Prisma.OwnerCreateInput) {
    return this.databaseService.owner.create({
      data: {
        ...createProductDto,
        password: await this.hashPassword(createProductDto.password)
      }
    });
  }

  findAll() {
    return this.databaseService.owner.findMany({});
  }

  findOne(id: number) {
    return this.databaseService.owner.findUnique(
      {
        where: {
          id,
        },
        include: {
          products: true
        }
      }
    );
  }

  update(id: number, updateProductDto: Prisma.OwnerUpdateInput) {
    return this.databaseService.owner.update({
      where: {
        id
      },
      data: updateProductDto
    });
  }

  remove(id: number) {
    return this.databaseService.owner.delete({
      where: {
        id
      }
    });
  }


  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async verifyUser(name: string, password: string) {
    const user = await this.databaseService.owner.findUnique(
      {
        where: {
          name,
        }
      }
    )
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Credentials not valid')
    }

    return user;
  }

}
