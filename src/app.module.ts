import { Dispatch_scheduleModule } from './dispatch_schedule/dispatch_schedule.module';
import { Dispatch_schedule } from './dispatch_schedule/models/dispatch_schedule.model';
import { Driver_helth } from './driver_helth/models/driver_helth.model';
import { candidates_submited_vacancyModule } from './candidates_submited_vacancy/vacancies.module';
import { candidates_submited_vacancy } from './candidates_submited_vacancy/models/vacancies.module';
import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.module';
import { Dispatcher } from './Dispatcher/models/Dispatcher.model';
import { DispatcherModule } from './dispatcher/dispatcher.module';
import { Candidate } from './candidate/models/candidate.model';
import { CandidateModule } from './candidate/candidate.module';
import { Vacancies } from './vacancies/models/vacancies.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { Driver_helthModule } from './driver_helth/driver_helth.module';
import { Vehicles } from './vehicles/models/vehicles.model';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Dispatcher,
        Candidate,
        Vacancies,
        candidates_submited_vacancy,
        Driver_helth,
        Dispatch_schedule,
        Vehicles,
      ],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),

    AdminModule,
    DispatcherModule,
    CandidateModule,
    VacanciesModule,
    candidates_submited_vacancyModule,
    Driver_helthModule,
    Dispatch_scheduleModule,
    VehiclesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
