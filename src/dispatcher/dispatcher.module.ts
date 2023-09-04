import { DispatcherService } from './dispatcher.service';
import { MailModule } from './../mail/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { DispatchersController } from './dispatcher.controller';
import { Dispatcher } from './models/Dispatcher.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Dispatcher]),
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [DispatchersController],
  providers: [DispatcherService],
})
export class DispatcherModule {}
