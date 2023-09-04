import { Dispatch_schedule } from './../../dispatch_schedule/models/dispatch_schedule.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, DataType, Table, HasMany } from 'sequelize-typescript';

interface Driver_helthAttrs {
  full_name: string;
  age: number;
  pressure: string;
  mood: string;
  tempture: string;
}

@Table({ tableName: 'driver_helth' })
export class Driver_helth extends Model<Driver_helth, Driver_helthAttrs> {
  @ApiProperty({ example: 1, description: 'driver_helth ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ApiProperty({
    example: 'Mardon Muminov',
    description: 'Foydalnuvchi tuliq ismi',
  })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({
    example: '19',
    description: 'yoshi',
  })
  @Column({
    type: DataType.STRING,
  })
  age: number;

  @ApiProperty({
    example: '120 / 80',
    description: 'qon bosimi',
  })
  @Column({
    type: DataType.STRING,
  })
  pressure: string;

  @ApiProperty({
    example: 'yaxshi',
    description: 'kayfiyati',
  })
  @Column({
    type: DataType.STRING,
  })
  mood: string;

  @ApiProperty({
    example: '36.4',
    description: 'harorati',
  })
  @Column({
    type: DataType.STRING,
  })
  tempture: string;

  @HasMany(() => Dispatch_schedule)
  dispatch_schedule: Dispatch_schedule[];
}
