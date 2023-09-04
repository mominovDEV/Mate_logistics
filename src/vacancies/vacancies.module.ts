import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { Vacancies } from './models/vacancies.module';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';

@Module({
  imports: [SequelizeModule.forFeature([Vacancies])],
  controllers: [VacanciesController],
  providers: [VacanciesService],
})
export class VacanciesModule {}
