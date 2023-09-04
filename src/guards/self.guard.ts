import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('15', req.params.id);
    console.log(req.payload.id);

    if (String(req.payload.id) !== req.params.id) {
      throw new ForbiddenException({
        message: 'You are not allowed',
      });
    }
    return true;
  }
}
