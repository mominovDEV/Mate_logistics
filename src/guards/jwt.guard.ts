import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.module';
import { Dispatcher } from '../dispatcher/models/dispatcher.model';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(`Unauthorized`);
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized');
    }

    async function verify(token: string, jwtService: JwtService) {
      try {
        const user: Partial<Dispatcher | Admin> = await jwtService.verify(
          token,
          {
            secret: process.env.ACCESS_TOKEN_KEY,
          },
        );
        req.payload = user;
        if (!user) {
          throw new UnauthorizedException('Invalid token provided');
        }
        if (!user.is_active) {
          console.log(user);
          throw new UnauthorizedException('Is not active');
        }
        return true;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    return verify(token, this.jwtService);
  }
}
