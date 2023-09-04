import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsStrongPassword,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ismi' })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({ example: 'Momininov', description: 'Foydalnuvchi familiyasi' })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({ example: 'Karimov', description: 'username' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 'brain@gmail.com', description: 'email' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'Uzbek!$t0n', description: 'password' })
  @IsStrongPassword()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '+998991239876', description: 'telefon raqami' })
  @IsOptional()
  phone_number?: string;
}
