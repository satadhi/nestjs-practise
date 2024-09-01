import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    protected readonly logger = new Logger(JwtStrategy.name);


    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken([
                (request: Request) => request.headers.Authorization,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET'),

        })
    }

    validate(payload: any) {

        this.logger.warn('The auth successful for', payload);

        return payload;
    }

}