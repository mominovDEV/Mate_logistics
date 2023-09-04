import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class Updatecandidates_submited_vacancyDto {
  @ApiProperty({
    example: '12/08/2023',
    description: 'vakansiyaga topshirilgan vaqiti',
  })
  @IsString()
  @IsOptional()
  submited_date?: Date;
}
