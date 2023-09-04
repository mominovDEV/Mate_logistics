import { AdminGuard } from './../guards/admin.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { VacanciesService } from './vacancies.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCandidates_submited_vacancyDto } from './dto/create-vacancies.dto';
import { Updatecandidates_submited_vacancyDto } from './dto/update-vacancies.dto';

@ApiTags('candidates_submited_vacancy')
@Controller('candidates_submited_vacancy')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @ApiOperation({ summary: "Yangi submited_date qo'shish" })
  @UseGuards()
  @Post('add')
  create(@Body() createVacanciesDto: CreateCandidates_submited_vacancyDto) {
    return this.vacanciesService.create(createVacanciesDto);
  }

  @ApiOperation({ summary: "submited_datelarni ko'rish" })
  @UseGuards()
  @Post('get')
  findAll() {
    return this.vacanciesService.findAll();
  }

  @ApiOperation({ summary: "submited_dateni id orqali ko'rish" })
  @UseGuards()
  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.vacanciesService.findOne(+id);
  }

  @ApiOperation({ summary: 'submited_dateni id orqali yangilash' })
  @UseGuards()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVacanciesDto: Updatecandidates_submited_vacancyDto,
  ) {
    return this.vacanciesService.update(+id, updateVacanciesDto);
  }

  @ApiOperation({ summary: "submited_dateni id orqali o'chirish" })
  @UseGuards()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(+id);
  }
}
