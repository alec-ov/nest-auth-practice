import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { UserPayload } from 'src/user/interfaces/user.payload.interface';

export const LoggedUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();

    const payload = request.user;
    const user: UserPayload = {
      id: payload.sub,
      name: payload.name,
    };

    return user;
  },
);
