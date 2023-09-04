import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, DataType, Table } from 'sequelize-typescript';

interface AdminAttrs {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  hashed_password: string;
  hashed_refresh_token: string;
  is_active: boolean;
  is_creator: boolean;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'admin ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ApiProperty({ example: 'Mardon', description: 'Foydalnuvchi ismi' })
  @IsString()
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Foydalnuvchi familiyasi' })
  @IsString()
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: 'Admin1',
    description: 'Adminname',
  })
  @IsString()
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @ApiProperty({ example: 'brain@gmail.com', description: 'Email' })
  @IsEmail()
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Telefon raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @ApiProperty({ example: '1234wertydsdfgh', description: 'Hashed token' })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'token',
    description: 'hashed_refresh_token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;
}
