import { MailModule } from './../mail/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { Candidate } from './models/candidate.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Candidate]),
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
