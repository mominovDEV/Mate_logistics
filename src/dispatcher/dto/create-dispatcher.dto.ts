import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, IsEmail } from 'class-validator';
import { Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class CreateDispatcherDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ismi' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Akbar', description: 'Foydalanuvchi familiyasi' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'Mirzayev', description: 'Username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek!$t0n', description: 'password' })
  @IsStrongPassword()
  password: string;
}
