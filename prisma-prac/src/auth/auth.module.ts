import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { CustomStrategy } from './strategies/jwt.strategy';
import { OwnerModule } from 'src/owner/owner.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

@Module({

  imports: [
    HttpModule,
    OwnerModule,
    JwtModule.registerAsync(
      {
        useFactory: (configService: ConfigService) => ({
          secret: configService.getOrThrow('JWT_SECRET'),
          signOptions: {
            expiresIn: Number(configService.getOrThrow("JWT_EXPIRATION"))
          }
        }),
        inject: [ConfigService]
      }
    ),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, CustomStrategy],
})
export class AuthModule { }
