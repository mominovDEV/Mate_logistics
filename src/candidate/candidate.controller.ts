import { AdminGuard } from './../guards/admin.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
@ApiTags('Candidate')
@Controller('candidate')
export class CandidateController {
  constructor(private readonly CandidateService: CandidateService) {}

  @ApiOperation({ summary: "Yangi Candidate qo'shish" })
  @Post('add')
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.CandidateService.create(createCandidateDto);
  }

  @ApiOperation({ summary: "Candidatelarni ko'rish" })
  @Post('get')
  findAll() {
    return this.CandidateService.findAll();
  }

  @ApiOperation({ summary: "Candidateni id orqali ko'rish" })
  @UseGuards()
  @Post(':id')
  findOneByAdmin(@Param('id') id: string) {
    return this.CandidateService.findOne(+id);
  }

  @ApiOperation({ summary: "Candidateni id orqali ko'rish" })
  @UseGuards()
  @Post('dispatch:id')
  findOneByDispetcher(@Param('id') id: string) {
    return this.CandidateService.findOne(+id);
  }

  @ApiOperation({ summary: 'Candidateni id orqali yangilash' })
  @UseGuards()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.CandidateService.update(+id, updateCandidateDto);
  }

  @ApiOperation({ summary: "Candidateni id orqali o'chirish" })
  @UseGuards()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CandidateService.remove(+id);
  }
}
