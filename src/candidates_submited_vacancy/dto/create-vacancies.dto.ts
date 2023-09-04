import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'candidates_submited_vacancy' })
export class CreateCandidates_submited_vacancyDto {
  @ApiProperty({
    example: '12/08/2023',
    description: 'vakansiya qachon topshirilgani',
  })
  @Column({
    type: DataType.DATE,
  })
  submited_date: Date;
}
