import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { Table } from 'sequelize-typescript';

@Table({ tableName: 'driver_helth' })
export class Create_driver_helth_Dto {
  @ApiProperty({ example: 'Akbar', description: 'Foydalanuvchi tuliq ismi' })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '18',
    description: 'yoshi',
  })
  age: number;

  @ApiProperty({ example: '120 / 80', description: 'qon bosimi' })
  pressure: string;

  @ApiProperty({ example: 'alo', description: 'kayfiyati' })
  mood: string;

  @ApiProperty({
    example: '37.2',
    description: 'temperaturasi',
  })
  tempture: string;
}
