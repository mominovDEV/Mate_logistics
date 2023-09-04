import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsEmail, IsOptional } from 'class-validator';

export class UpdateDispatcherDto {
  @ApiProperty({ example: 'Salim', description: 'Dispatcher ismi' })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({ example: 'Salimov', description: 'Dispatcher familiyasi' })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    example: "Qipchoq ko'chasi 34-2",
    description: 'Dispatcher manzili',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'salim@gmail.com', description: 'Dispatcher emaili' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'password', description: 'Dispatcher paroli' })
  @IsString()
  @IsOptional()
  password?: string;
}
