import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { OwnerService } from "src/owner/owner.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly ownerService: OwnerService) {
        super(
            { usernameField: 'name' }
        )
    }


    async validate(name: string, password: string) {

        try {

            // this is basically getting stored ins request.user object
            return await this.ownerService.verifyUser(name, password);
        } catch (err) {
            throw new UnauthorizedException('Credentials are not valid.');
        }
    }
}