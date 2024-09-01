import { AuthGuard } from "@nestjs/passport";

/**
 * @description local guard meaning check for login password that should be 
 * triggered on login controller
 */
export class LocalAuthGuard extends AuthGuard('local') { }