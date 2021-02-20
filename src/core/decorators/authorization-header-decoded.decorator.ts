import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt_decode from 'jwt-decode';
import { AccessTokenPayload } from '../interfaces/acess-token-payload.interface';

export const AuthorizationHeaderDecoded = createParamDecorator(
  (field: keyof AccessTokenPayload | 'all', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const bearer = (request.headers as any).authorization;
    const split: string[] | undefined = bearer && bearer.split('Bearer');
    const accessToken: string | undefined = split.length ? split[1].trim() : undefined;
    return accessToken ?
      field !== 'all' ? jwt_decode(accessToken)[field] : jwt_decode(accessToken)
      : undefined;
  },
);
