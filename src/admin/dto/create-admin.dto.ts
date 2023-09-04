import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, IsEmail } from 'class-validator';
import { Table } from 'sequelize-typescript';

@Table({ tableName: 'admin' })
export class CreateAdminDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ismi' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Momininov', description: 'Foydalnuvchi familiyasi' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'Karimov', description: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'brain@gmail.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek!$t0n', description: 'password' })
  @IsStrongPassword()
  password: string;
  @ApiProperty({ example: '+998991239876', description: 'telefon raqami' })
  phone_number: string;
}
