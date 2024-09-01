import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const getCurrentUserByContext = (context: ExecutionContext): Prisma.OwnerCreateInput => {
    return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context),
);
