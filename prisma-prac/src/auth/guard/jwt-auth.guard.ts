import { AuthGuard, } from "@nestjs/passport";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";

export class JwtAuthGuard extends AuthGuard('jwt') { }