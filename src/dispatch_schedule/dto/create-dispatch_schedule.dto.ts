import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table } from 'sequelize-typescript';

@Table({ tableName: 'dispatch_schedule' })
export class Create_dispatch_schedule_Dto {
  @ApiProperty({
    example: '140',
    description: 'bir kunda nechta dispatch qilgani',
  })
  @IsNumber()
  dispatch_num: number;

  @ApiProperty({
    example: '12/03/2023',
    description: 'davomiyligi',
  })
  duration: string;

  @ApiProperty({
    example: 'alyaskadan qoraqamishga',
    description: 'qayerdan qayerga olib borgani',
  })
  place_to_place: string;
}
