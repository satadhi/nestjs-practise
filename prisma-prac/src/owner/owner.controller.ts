import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Prisma } from '@prisma/client';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) { }

  @Post()
  create(@Body() createOwnerDto: Prisma.OwnerCreateInput) {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: Prisma.OwnerCreateInput) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id);
  }
}
