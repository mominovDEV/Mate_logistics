import { Vacancies } from './../../vacancies/models/vacancies.module';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Candidate } from '../../candidate/models/candidate.model';

interface VacanciesAttrs {
  submited_date: Date;
  candidate_id: number;
  vacancies_id: number;
}

@Table({ tableName: 'candidates_submited_vacancy' })
export class candidates_submited_vacancy extends Model<
  candidates_submited_vacancy,
  VacanciesAttrs
> {
  @ApiProperty({ example: 1, description: 'candidates_submited_vacancy ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Candidate)
  @Column({ type: DataType.INTEGER })
  candidate_id: number;
  @BelongsTo(() => Candidate)
  candidate: Candidate;

  @ForeignKey(() => Vacancies)
  @Column({ type: DataType.INTEGER })
  vacancies_id: number;
  @BelongsTo(() => Vacancies)
  vacancies: Vacancies[];

  @ApiProperty({
    example: '12/08/2023',
    description: 'vakansiya qachon topshirilgani',
  })
  @Column({
    type: DataType.DATE,
  })
  submited_date: Date;
}
