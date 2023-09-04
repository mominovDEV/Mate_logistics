import { UpdateDispatch_scheduleDto } from './dto/update-dispatch_schedule.dto';
import { Create_dispatch_schedule_Dto } from './dto/create-dispatch_schedule.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Dispatch_schedule } from './models/dispatch_schedule.model';
@Injectable()
export class Dispatch_scheduleService {
  constructor(
    @InjectModel(Dispatch_schedule)
    private Dispatch_scheduleRepo: typeof Dispatch_schedule,
  ) {}
  async create(
    createDispatch_scheduleDto: Create_dispatch_schedule_Dto,
  ): Promise<{ message: string; Dispatch_schedule: Dispatch_schedule }> {
    const Dispatch_schedule = await this.Dispatch_scheduleRepo.create(
      createDispatch_scheduleDto,
    );
    if (Dispatch_schedule) {
      return {
        message: 'Created',
        Dispatch_schedule,
      };
    }
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<Dispatch_schedule[]> {
    const Dispatch_schedule = await this.Dispatch_scheduleRepo.findAll({
      include: { all: true },
    });
    if (Dispatch_schedule.length > 0) {
      return Dispatch_schedule;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const Dispatch_schedule_type = await this.Dispatch_scheduleRepo.findByPk(
      id,
      {
        include: { all: true },
      },
    );
    if (Dispatch_schedule_type) {
      return Dispatch_schedule_type;
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updateDispatch_scheduleTypeDto: UpdateDispatch_scheduleDto,
  ): Promise<{ message: string; updated: Dispatch_schedule }> {
    const client = await this.Dispatch_scheduleRepo.findByPk(id);
    if (client) {
      const updatedDispatch_scheduleType =
        await this.Dispatch_scheduleRepo.update(
          updateDispatch_scheduleTypeDto,
          {
            where: { id },
            returning: true,
          },
        );

      if (updatedDispatch_scheduleType[0]) {
        return {
          message: 'Updated succesfully',
          updated: updatedDispatch_scheduleType[1][0].dataValues,
        };
      }
      throw new BadRequestException('Did not updated');
    } else {
      throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.Dispatch_scheduleRepo.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: 'Deleted succesfully' };
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }
}
