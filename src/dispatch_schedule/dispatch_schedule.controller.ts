import { DispatcherGuard } from './../guards/dispatcher.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { UpdateDispatch_scheduleDto } from './dto/update-dispatch_schedule.dto';
import { Create_dispatch_schedule_Dto } from './dto/create-dispatch_schedule.dto';
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
import { Dispatch_scheduleService } from './dispatch_schedule.service';
@ApiTags('Dispatch_schedule')
@Controller('dispatch_schedule')
export class Dispatch_scheduleController {
  constructor(
    private readonly dispatch_scheduleService: Dispatch_scheduleService,
  ) {}

  @ApiOperation({ summary: "Yangi Dispatch_schedule qo'shish" })
  @Post('add')
  create(@Body() createDispatch_scheduleDto: Create_dispatch_schedule_Dto) {
    return this.dispatch_scheduleService.create(createDispatch_scheduleDto);
  }
  @UseGuards(DispatcherGuard)
  @ApiOperation({ summary: "Dispatch_schedulelarini ko'rish" })
  @Post('all')
  findAll() {
    return this.dispatch_scheduleService.findAll();
  }

  @ApiOperation({ summary: "Dispatch_scheduleni id orqali ko'rish" })
  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.dispatch_scheduleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Dispatch_scheduleni id orqali yangilash' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDispatch_scheduleDto: UpdateDispatch_scheduleDto,
  ) {
    return this.dispatch_scheduleService.update(
      +id,
      updateDispatch_scheduleDto,
    );
  }

  @ApiOperation({ summary: "Dispatch_scheduleni id orqali o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatch_scheduleService.remove(+id);
  }
}
