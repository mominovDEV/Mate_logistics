import { Dispatch_schedule } from './../../dispatch_schedule/models/dispatch_schedule.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, DataType, Table, HasMany } from 'sequelize-typescript';

interface VehiclesAttrs {
  lot_number: number;
  make: string;
  model: string;
  vin: string;
  year: string;
}

@Table({ tableName: 'vehicles' })
export class Vehicles extends Model<Vehicles, VehiclesAttrs> {
  @ApiProperty({ example: 1, description: 'vehicles ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ApiProperty({
    example: '12448',
    description: 'Number',
  })
  @Column({
    type: DataType.STRING,
  })
  lot_number: number;

  @ApiProperty({
    example: 'BMW',
    description: 'make',
  })
  @Column({
    type: DataType.STRING,
  })
  make: string;

  @ApiProperty({
    example: 'vin',
    description: 'Vin',
  })
  @Column({
    type: DataType.STRING,
  })
  vin: string;

  @ApiProperty({
    example: '1999',
    description: 'year',
  })
  @Column({
    type: DataType.STRING,
  })
  year: string;

  @HasMany(() => Dispatch_schedule)
  dispatch_schedule: Dispatch_schedule[];
}
