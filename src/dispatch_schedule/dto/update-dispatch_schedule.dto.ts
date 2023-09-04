import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateDispatch_scheduleDto {
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
    example: 'Alyaskadan qoraqamishga',
    description: 'qayerdan qayerga olib borgani',
  })
  place_to_place: string;
}
