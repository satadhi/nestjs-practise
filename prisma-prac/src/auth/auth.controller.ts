import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CurrentUser } from './current-owner.decorator';
import { Prisma } from '@prisma/client';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')

  // this basically does the the usename and password.
  // the below login is what we want to send back to the user
  @UseGuards(LocalAuthGuard)

  async login(@CurrentUser() user: Prisma.OwnerCreateInput,
    @Res({ passthrough: true }) response: Response
  ) {

    await this.authService.login(user, response)

  }

}
