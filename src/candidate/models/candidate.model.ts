import { candidates_submited_vacancy } from './../../candidates_submited_vacancy/models/vacancies.module';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

interface CandidateAttrs {
  full_name: string;
  current_adress: string;
  phone_number: string;
  birth_date: Date;
  english_level: string;
  current_activity: string;
  email: string;
}

@Table({ tableName: 'Candidate' })
export class Candidate extends Model<Candidate, CandidateAttrs> {
  @ApiProperty({ example: 1, description: 'Candidate ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ApiProperty({
    example: 'Mardon Muminov',
    description: 'Foydalnuvchi tuliq ismi',
  })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({
    example: 'chilonzor',
    description: 'hozirgi turar joyi manzili',
  })
  @Column({
    type: DataType.STRING,
  })
  current_adress: string;
  @ApiProperty({
    example: '+9989923234234',
    description: 'telefon raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @ApiProperty({
    example: '1999',
    description: 'tugilgan yili',
  })
  @Column({
    type: DataType.STRING,
  })
  birth_date: string;

  @ApiProperty({
    example: 'intermediate',
    description: 'ingliz tilini bilish darajasi',
  })
  @Column({
    type: DataType.STRING,
  })
  english_level: string;

  @ApiProperty({
    example: 'student',
    description: 'hozirgi bandligi',
  })
  @Column({
    type: DataType.STRING,
  })
  current_activity: string;

  @ApiProperty({ example: 'brain@gmail.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @HasMany(() => candidates_submited_vacancy)
  Candidates_submited_vacancy: candidates_submited_vacancy[];
}
