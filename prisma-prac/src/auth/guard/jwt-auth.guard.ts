import { AuthGuard, } from "@nestjs/passport";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";

export class CustomAuthGuard extends AuthGuard('custom') {

    // The AuthGuard class in @nestjs/passport is a wrapper around Passport's authenticate method.
    // When you call super.canActivate(context), it internally calls Passport's authenticate method.
    // which is present in strategies/jwt.strategy.ts
    canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("canActivate is getting called", context)
        return super.canActivate(context) as Promise<boolean>;
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw err || new UnauthorizedException('Authentication failed');
        }
        return user;
    }
}