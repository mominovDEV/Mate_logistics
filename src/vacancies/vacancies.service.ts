import { InjectModel } from '@nestjs/sequelize';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateVacanciesDto } from './dto/create-vacancies.dto';
import { Vacancies } from './models/vacancies.module';
import { UpdateVacanciesDto } from './dto/update-vacancies.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancies) private vacanciesRepo: typeof Vacancies,
  ) {}
  async create(
    createVacanciesDto: CreateVacanciesDto,
  ): Promise<{ message: string; Vacancies: Vacancies }> {
    const Vacancies = await this.vacanciesRepo.create(createVacanciesDto);
    if (Vacancies) {
      return {
        message: 'Created',
        Vacancies,
      };
    }
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<Vacancies[]> {
    const Vacancies = await this.vacanciesRepo.findAll({
      include: { all: true },
    });
    if (Vacancies.length > 0) {
      return Vacancies;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const service_type = await this.vacanciesRepo.findByPk(id, {
      include: { all: true },
    });
    if (service_type) {
      return service_type;
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updateServiceTypeDto: UpdateVacanciesDto,
  ): Promise<{ message: string; updated: Vacancies }> {
    const client = await this.vacanciesRepo.findByPk(id);
    if (client) {
      const updatedServiceType = await this.vacanciesRepo.update(
        updateServiceTypeDto,
        {
          where: { id },
          returning: true,
        },
      );

      if (updatedServiceType[0]) {
        return {
          message: 'Updated succesfully',
          updated: updatedServiceType[1][0].dataValues,
        };
      }
      throw new BadRequestException('Did not updated');
    } else {
      throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.vacanciesRepo.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: 'Deleted succesfully' };
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }
}
