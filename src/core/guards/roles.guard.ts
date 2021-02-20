import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { keycloak } from '../../config/keycloak';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /** @inheritDoc */
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request: Request = context.switchToHttp().getRequest();
    const bearer = (request.headers as any).authorization;
    const split: string[] | undefined = bearer && bearer.split('Bearer');
    const accessToken: string | undefined = split.length ? split[1].trim() : undefined;
    if (!accessToken) {
      return false;
    }
    return new Promise((resolve: (canActivate: boolean) => void) => {
      keycloak.jwt.verify(accessToken)
        .then(token => {
          if (token.isExpired()) {
            throw new UnauthorizedException();
          } else if (roles && roles.length && roles.filter(r => token.hasRealmRole(r)).length === 0) {
            return resolve(false);
          } else {
            return resolve(true);
          }
        }, error => {
          Logger.error('There was an error parsing the token', error.toString());
          resolve(false);
        });
    });
  }
}
