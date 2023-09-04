import { Module } from '@nestjs/common';
import { AdminsService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AdminsController } from './admin.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminModule {}
