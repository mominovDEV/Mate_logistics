import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { Table } from 'sequelize-typescript';

@Table({ tableName: 'candidate' })
export class CreateCandidateDto {
  @ApiProperty({ example: 'Akbar', description: 'Foydalanuvchi tuliq ismi' })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: 'chilonzor choponota kuchasi 9 kvartal',
    description: 'hozirgi manzil',
  })
  @IsString()
  current_adress: string;

  @ApiProperty({ example: '+998993603500', description: 'telefon raqami' })
  phone_number: string;

  @ApiProperty({ example: '12/04/2004', description: 'tugilgan yili' })
  brith_day: Date;

  @ApiProperty({
    example: 'intermediate',
    description: 'ingliz tilini bilish darajasi',
  })
  english_level: string;

  @ApiProperty({ example: 'student', description: 'hozirgi bandligi' })
  current_activity: string;

  @ApiProperty({ example: 'brain@gmail.com', description: 'emaili' })
  @IsEmail()
  email: string;
}
