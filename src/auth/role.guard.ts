import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/user/decarator/dec';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflektor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    let roles = this.reflektor.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    let r = context.switchToHttp().getRequest();

    if (!roles || roles.length === 0) {
      console.log(true);

      return true;
    }

    if (roles.includes(r.user.role)) {
      console.log(true);
      return true;
    }

    console.log(false);
    return false;
  }
}
