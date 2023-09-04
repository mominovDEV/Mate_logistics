import { Driver_helth } from './../../driver_helth/models/driver_helth.model';
import { Dispatcher } from './../../dispatcher/models/dispatcher.model';
import { Vehicles } from './../../vehicles/models/vehicles.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

interface Dispatch_scheduleAttrs {
  dispatch_num: number;
  duration: string;
  place_to_place: string;
  vehicles_id: number;
  dispatcher_id: number;
  driver_helth_id: number;
}

@Table({ tableName: 'dispatch_schedule' })
export class Dispatch_schedule extends Model<
  Dispatch_schedule,
  Dispatch_scheduleAttrs
> {
  @ApiProperty({ example: 1, description: 'Dispatch_schedule ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Vehicles)
  @Column({ type: DataType.INTEGER })
  vehicles_id: number;
  @BelongsTo(() => Vehicles)
  vehicles: Vehicles;

  @ForeignKey(() => Dispatcher)
  @Column({ type: DataType.INTEGER, allowNull: false })
  dispatcher_id: number;

  @BelongsTo(() => Dispatcher, 'id')
  dispatcher: Dispatcher;

  @ForeignKey(() => Driver_helth)
  @Column({ type: DataType.INTEGER })
  driver_helth_id: number;
  @BelongsTo(() => Driver_helth)
  driver_helth: Driver_helth;

  @ApiProperty({
    example: 'Mardon Muminov',
    description: 'Foydalnuvchi tuliq ismi',
  })
  @Column({
    type: DataType.STRING,
  })
  dispatch_num: number;

  @ApiProperty({
    example: '19',
    description: 'yoshi',
  })
  @Column({
    type: DataType.STRING,
  })
  duration: string;

  @ApiProperty({
    example: '120 / 80',
    description: 'qon bosimi',
  })
  @Column({
    type: DataType.STRING,
  })
  place_to_place: string;
}
