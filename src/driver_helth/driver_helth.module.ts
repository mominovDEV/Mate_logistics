import { MailModule } from './../mail/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver_helth } from './models/driver_helth.model';
import { Driver_helthController } from './driver_helth.controller';
import { Driver_helthService } from './driver_helth.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Driver_helth]),
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [Driver_helthController],
  providers: [Driver_helthService],
})
export class Driver_helthModule {}
