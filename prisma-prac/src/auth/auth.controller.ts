import { BadRequestException, Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CurrentUser } from './current-owner.decorator';
import { Prisma } from '@prisma/client';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    try {
      const result = await this.authService.login(body.email, body.password);
      return {
        message: 'Login successful!',
        tokens: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signup')
  async signup(@Body() body: { email: string, password: string }) {

    console.log("I hit signup", body)
    try {
      const result = await this.authService.signUp(body.email, body.password);
      return {
        message: 'Signup successful! Please check your email for the confirmation code.',
        result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('confirm-signup')
  async confirmSignUp(@Body() body: { email: string, code: string }) {
    try {
      const result = await this.authService.confirmSignUp(body.email, body.code);
      return {
        message: 'Signup confirmed! You can now log in.',
        result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const tokens = await this.authService.refreshToken(refreshToken);
    return {
      accessToken: tokens.AccessToken,
      idToken: tokens.IdToken,
    };
  }
}