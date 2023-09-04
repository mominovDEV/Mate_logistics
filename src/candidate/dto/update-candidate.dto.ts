import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCandidateDto {
  @ApiProperty({
    example: 'Mardon Muminov',
    description: 'Foydalnuvchi tuliq ismi',
  })
  full_name?: string;

  @ApiProperty({
    example: 'chilonzor',
    description: 'hozirgi turar joyi manzili',
  })
  current_adress?: string;

  @ApiProperty({
    example: '+9989923234234',
    description: 'telefon raqami',
  })
  phone_number?: string;

  @ApiProperty({
    example: '1999',
    description: 'tugilgan yili',
  })
  birth_date?: string;

  @ApiProperty({
    example: 'intermediate',
    description: 'ingliz tilini bilish darajasi',
  })
  english_level?: string;

  @ApiProperty({
    example: 'student',
    description: 'hozirgi bandligi',
  })
  current_activity?: string;

  @ApiProperty({ example: 'brain@gmail.com', description: 'Email' })
  email?: string;
}
