import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'vacancies' })
export class CreateVacanciesDto {
  @ApiProperty({
    example: 'auto transportation broker',
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
}
