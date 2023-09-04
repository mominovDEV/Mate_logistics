import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Create_Vehicles_Dto } from './dto/create-vehicles.dto';
import { Vehicles } from './models/vehicles.model';
import { UpdateVehiclesDto } from './dto/update-vehicles.dto';
@Injectable()
export class VehiclesService {
  constructor(@InjectModel(Vehicles) private VehiclesRepo: typeof Vehicles) {}
  async create(
    createVehiclesDto: Create_Vehicles_Dto,
  ): Promise<{ message: string; Vehicles: Vehicles }> {
    const Vehicles = await this.VehiclesRepo.create(createVehiclesDto);
    if (Vehicles) {
      return {
        message: 'Created',
        Vehicles,
      };
    }
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<Vehicles[]> {
    const Vehicles = await this.VehiclesRepo.findAll({
      include: { all: true },
    });
    if (Vehicles.length > 0) {
      return Vehicles;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const Vehicles_type = await this.VehiclesRepo.findByPk(id, {
      include: { all: true },
    });
    if (Vehicles_type) {
      return Vehicles_type;
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updateVehiclesTypeDto: UpdateVehiclesDto,
  ): Promise<{ message: string; updated: Vehicles }> {
    const client = await this.VehiclesRepo.findByPk(id);
    if (client) {
      const updatedVehiclesType = await this.VehiclesRepo.update(
        updateVehiclesTypeDto,
        {
          where: { id },
          returning: true,
        },
      );

      if (updatedVehiclesType[0]) {
        return {
          message: 'Updated succesfully',
          updated: updatedVehiclesType[1][0].dataValues,
        };
      }
      throw new BadRequestException('Did not updated');
    } else {
      throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.VehiclesRepo.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: 'Deleted succesfully' };
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }
}
