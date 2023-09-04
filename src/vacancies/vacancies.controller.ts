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
import { CreateVacanciesDto } from './dto/create-vacancies.dto';
import { UpdateVacanciesDto } from './dto/update-vacancies.dto';

@ApiTags('Vacancy')
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @ApiOperation({ summary: "Yangi Vacancies qo'shish" })
  @Post('add')
  create(@Body() createVacanciesDto: CreateVacanciesDto) {
    return this.vacanciesService.create(createVacanciesDto);
  }

  @ApiOperation({ summary: "Vacancieslarni ko'rish" })
  @Post('all')
  findAll() {
    return this.vacanciesService.findAll();
  }

  @ApiOperation({ summary: "Vacanciesni id orqali ko'rish" })
  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.vacanciesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Vacanciesni id orqali yangilash' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVacanciesDto: UpdateVacanciesDto,
  ) {
    return this.vacanciesService.update(+id, updateVacanciesDto);
  }

  @ApiOperation({ summary: "Vacanciesni id orqali o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(+id);
  }
}
