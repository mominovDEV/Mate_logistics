import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'sequelize-typescript';
import { Dispatcher } from '../dispatcher/models/dispatcher.model';

interface DispatcherGuardAttr extends Model<Dispatcher> {
  role: string;
}

@Injectable()
export class DispatcherGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    async function verify(token: string, jwtService: JwtService) {
      try {
        const user: Partial<DispatcherGuardAttr> = await jwtService.verify(
          token,
          { secret: process.env.ACCESS_TOKEN_KEY },
        );
        if (user.role == 'Dispetcher') {
          return true;
        }
        throw new UnauthorizedException('User is not  Dispatcher');
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    return verify(token, this.jwtService);
  }
}
