import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { Table } from 'sequelize-typescript';

@Table({ tableName: 'vehicles' })
export class Create_Vehicles_Dto {
  @ApiProperty({
    example: '12448',
    description: 'Number',
  })
  lot_number: number;

  @ApiProperty({
    example: 'BMW',
    description: 'make',
  })
  @IsString()
  make: string;

  @ApiProperty({
    example: 'vin',
    description: 'Vin',
  })
  @IsString()
  vin: string;

  @ApiProperty({
    example: '1999',
    description: 'year',
  })
  @IsString()
  year: string;
}
