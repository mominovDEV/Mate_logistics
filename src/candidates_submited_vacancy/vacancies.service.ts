import { InjectModel } from '@nestjs/sequelize';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCandidates_submited_vacancyDto } from './dto/create-vacancies.dto';
import { candidates_submited_vacancy } from './models/vacancies.module';
import { Updatecandidates_submited_vacancyDto } from './dto/update-vacancies.dto';
import { candidates_submited_vacancyModule } from './vacancies.module';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(candidates_submited_vacancy)
    private vacanciesRepo: typeof candidates_submited_vacancy,
  ) {}
  async create(
    createVacanciesDto: CreateCandidates_submited_vacancyDto,
  ): Promise<{
    message: string;
    CreateCandidates_submited_vacancy: candidates_submited_vacancyModule;
  }> {
    const CreateCandidates_submited_vacancy = await this.vacanciesRepo.create(
      createVacanciesDto,
    );
    if (CreateCandidates_submited_vacancy) {
      return {
        message: 'Created',
        CreateCandidates_submited_vacancy,
      };
    }
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<candidates_submited_vacancy[]> {
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
    updateServiceTypeDto: Updatecandidates_submited_vacancyDto,
  ): Promise<{ message: string; updated: candidates_submited_vacancy }> {
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
