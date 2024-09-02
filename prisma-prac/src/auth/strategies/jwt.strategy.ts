import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from 'passport-jwt'
// import { ConfigService } from '@nestjs/config';
import { AuthService } from "../auth.service";
import { Strategy } from 'passport-strategy';



// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {

//     protected readonly logger = new Logger(JwtStrategy.name);

//     constructor(configService: ConfigService, private readonly authService: AuthService) {
//         // super({
//         //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken([
//         //         (request: Request) => request.headers.Authorization,
//         //     ]),
//         //     ignoreExpiration: false,
//         //     secretOrKey: configService.getOrThrow('JWT_SECRET'),

//         // })

//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKeyProvider: (request, rawJwtToken, done) => {
//                 // Here, you can use the token to determine which key to use
//                 // For now, we might use a fixed key or null to bypass internal verification
//                 // In practice, this is where you handle dynamic secrets if needed

//                 // Example: Dynamically provide a key based on the token
//                 // For your case, you might not need to use a real key, so providing null
//                 done(new Error("i dont know what is happening"), ''); // Provide null or empty string to avoid internal verification
//             },
//         });
//     }

//     async validate(payload: any) {

//         console.log("this is validate log for auth", payload);
//         try {
//             const user = await this.authService.verifyToken(payload.token);
//             console.log("this is paylog for auth", payload);
//             return user;
//         } catch (error) {
//             throw new UnauthorizedException();
//         }
//     }

// }


@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
    name = "custom"
    constructor(private readonly authService: AuthService) {
        super();
        // this.name = 'custom'; // Set a name for your strategy
    }

    async authenticate(req: any) {
        console.log("authenticate is triggered ???")
        // Extract token from request (header, query, etc.)
        const token = req.headers.authorization?.split(' ')[1]; // Assumes Bearer token

        if (!token) {

            return this.fail('Token not provided', 404)
            // return new UnauthorizedException('Token not provided');
        }

        try {
            // Verify the token using the authService
            const user = await this.authService.verifyToken(token);

            // If successful, pass user to Passport
            return this.success(user);
        } catch (error) {

            return this.fail('Invalid token', 401)
            // If verification fails, fail authentication
            // return new UnauthorizedException('Invalid token');
        }
    }
}
