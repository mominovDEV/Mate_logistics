import { IsStrongPassword, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({ example: 'admin@mail.ru', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'p@s5W0rd', description: 'Password' })
  @IsStrongPassword()
  password: string;
}
