import { Dispatcher } from './../dispatcher/models/dispatcher.model';
import { Dispatch_scheduleService } from './dispatch_schedule.service';
import { Dispatch_scheduleController } from './dispatch_schedule.controller';
import { Dispatch_schedule } from './models/dispatch_schedule.model';
import { MailModule } from './../mail/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Dispatch_schedule, Dispatcher]),
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [Dispatch_scheduleController],
  providers: [Dispatch_scheduleService],
})
export class Dispatch_scheduleModule {}
