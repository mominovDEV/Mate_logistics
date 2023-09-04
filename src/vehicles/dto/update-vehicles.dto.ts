import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateVehiclesDto {
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
