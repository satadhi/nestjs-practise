import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { TagsModule } from './tags/tags.module';
import { OwnerModule } from './owner/owner.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        validationSchema: Joi.object({
          "JWT_SECRET": Joi.string().required()
        })
      }
    ),
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                },
              },
            level: isProduction ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }),

    ProductsModule, DatabaseModule, TagsModule, OwnerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
