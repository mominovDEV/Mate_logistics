import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from './../guards/Admin.guard';
import { Candidate } from './../candidate/models/candidate.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { candidates_submited_vacancy } from './models/vacancies.module';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './Vacancies.service';

@Module({
  imports: [
    SequelizeModule.forFeature([candidates_submited_vacancy, Candidate]),
    JwtModule.register({}),
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
})
export class candidates_submited_vacancyModule {}
