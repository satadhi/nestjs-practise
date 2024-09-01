import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }


  async login(owner: Prisma.OwnerCreateInput, res: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION'),
    );


    const tokenPayload = {
      name: owner.name,
      role: owner.role

    };
    const token = this.jwtService.sign(tokenPayload);

    res.send({ ...tokenPayload, token })
  }

}
