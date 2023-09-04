import { Dispatch_schedule } from './../../dispatch_schedule/models/dispatch_schedule.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, DataType, Table, HasMany } from 'sequelize-typescript';

interface DispatcherAttrs {
  first_name: string;
  last_name: string;
  username: string;
  age: string;
  exprens_of_working: string;
  monthly: string;
  gender: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string;
  is_creator: boolean;
  is_active: boolean;
}

@Table({ tableName: 'Dispatcher' })
export class Dispatcher extends Model<Dispatcher, DispatcherAttrs> {
  @ApiProperty({ example: 1, description: 'Dispatcher ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Mardon', description: 'Foydalnuvchi ismi' })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Foydalnuvchi familiyasi' })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: 'Dispatcher1',
    description: 'Dispatchername',
  })
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @ApiProperty({
    example: '18',
    description: 'dispatcher yoshi',
  })
  @Column({
    type: DataType.STRING,
  })
  age: string;

  @ApiProperty({
    example: '1 yil',
    description: 'ish tajribasi',
  })
  @Column({
    type: DataType.STRING,
  })
  exprens_of_working: string;

  @ApiProperty({
    example: '1000$',
    description: 'oylik tulovi',
  })
  @Column({
    type: DataType.STRING,
  })
  monthly: string;

  @ApiProperty({
    example: 'woman',
    description: 'gender',
  })
  @Column({
    type: DataType.STRING,
  })
  gender: string;

  @ApiProperty({ example: 'brain@gmail.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: 'hashed password', description: 'Hashed' })
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

  // @HasMany(() => Dispatch_schedule, {
  //   sourceKey: 'dispatcher_id',
  // })
  // dispatch_schedule: Dispatch_schedule[];
}
