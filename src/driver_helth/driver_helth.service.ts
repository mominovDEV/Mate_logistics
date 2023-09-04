import { Create_driver_helth_Dto } from './dto/create-driver_helth.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Driver_helth } from './models/driver_helth.model';
import { UpdateDriver_helthDto } from './dto/update-driver_helth.dto';
@Injectable()
export class Driver_helthService {
  constructor(
    @InjectModel(Driver_helth) private Driver_helthRepo: typeof Driver_helth,
  ) {}
  async create(
    createDriver_helthDto: Create_driver_helth_Dto,
  ): Promise<{ message: string; Driver_helth: Driver_helth }> {
    const Driver_helth = await this.Driver_helthRepo.create(
      createDriver_helthDto,
    );
    if (Driver_helth) {
      return {
        message: 'Created',
        Driver_helth,
      };
    }
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<Driver_helth[]> {
    const Driver_helth = await this.Driver_helthRepo.findAll({
      include: { all: true },
    });
    if (Driver_helth.length > 0) {
      return Driver_helth;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const Driver_helth_type = await this.Driver_helthRepo.findByPk(id, {
      include: { all: true },
    });
    if (Driver_helth_type) {
      return Driver_helth_type;
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updateDriver_helthTypeDto: UpdateDriver_helthDto,
  ): Promise<{ message: string; updated: Driver_helth }> {
    const client = await this.Driver_helthRepo.findByPk(id);
    if (client) {
      const updatedDriver_helthType = await this.Driver_helthRepo.update(
        updateDriver_helthTypeDto,
        {
          where: { id },
          returning: true,
        },
      );

      if (updatedDriver_helthType[0]) {
        return {
          message: 'Updated succesfully',
          updated: updatedDriver_helthType[1][0].dataValues,
        };
      }
      throw new BadRequestException('Did not updated');
    } else {
      throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.Driver_helthRepo.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: 'Deleted succesfully' };
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }
}
