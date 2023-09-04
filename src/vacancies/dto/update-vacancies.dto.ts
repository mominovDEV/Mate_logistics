import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateVacanciesDto {
  @ApiProperty({
    example: 'auto transportation broker',
    description: 'vakansiya turi',
  })
  @IsString()
  @IsOptional()
  vacancy_name?: string;

  @ApiProperty({
    example: 'eg: 1. english leveli bulishi kerak, 2. kompyuter savodhonligi',
    description: 'vakansiyaga topshirish uchun nimalarni bilishi kerakligi',
  })
  description?: string;
}
