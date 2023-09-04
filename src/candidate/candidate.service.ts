import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Candidate } from './models/candidate.model';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate) private CandidateRepo: typeof Candidate,
  ) {}
  async create(
    createCandidateDto: CreateCandidateDto,
  ): Promise<{ message: string; Candidate: Candidate }> {
    const Candidate = await this.CandidateRepo.create(createCandidateDto);
    if (Candidate) {
      return {
        message: 'Created',
        Candidate,
      };
    }
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<Candidate[]> {
    const Candidate = await this.CandidateRepo.findAll({
      include: { all: true },
    });
    if (Candidate.length > 0) {
      return Candidate;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const Candidate_type = await this.CandidateRepo.findByPk(id, {
      include: { all: true },
    });
    if (Candidate_type) {
      return Candidate_type;
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updateCandidateTypeDto: UpdateCandidateDto,
  ): Promise<{ message: string; updated: Candidate }> {
    const client = await this.CandidateRepo.findByPk(id);
    if (client) {
      const updatedCandidateType = await this.CandidateRepo.update(
        updateCandidateTypeDto,
        {
          where: { id },
          returning: true,
        },
      );

      if (updatedCandidateType[0]) {
        return {
          message: 'Updated succesfully',
          updated: updatedCandidateType[1][0].dataValues,
        };
      }
      throw new BadRequestException('Did not updated');
    } else {
      throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.CandidateRepo.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: 'Deleted succesfully' };
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }
}
