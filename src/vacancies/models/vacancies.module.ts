import { candidates_submited_vacancy } from './../../candidates_submited_vacancy/models/vacancies.module';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, DataType, Table, HasMany } from 'sequelize-typescript';

interface VacanciesAttrs {
  vacancy_name: string;
  description: string;
}

@Table({ tableName: 'vacancies' })
export class Vacancies extends Model<Vacancies, VacanciesAttrs> {
  @ApiProperty({ example: 1, description: 'Vacancy ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ApiProperty({
    example: 'Auto transportation broker',
    description: 'vakansiya turi',
  })
  @Column({
    type: DataType.STRING,
  })
  vacancy_name: string;

  @ApiProperty({
    example: 'eg: 1. english leveli bulishi kerak, 2. kompyuter savodhonligi',
    description: 'vakansiyaga topshirish uchun nimalarni bilishi kerakligi',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => candidates_submited_vacancy)
  Candidates_submited_vacancy: candidates_submited_vacancy[];
}
