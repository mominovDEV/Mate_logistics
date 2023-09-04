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
import { Driver_helthService } from './driver_helth.service';
import { Create_driver_helth_Dto } from './dto/create-driver_helth.dto';
import { UpdateDriver_helthDto } from './dto/update-driver_helth.dto';
@ApiTags('Driver_helth')
@Controller('driver_helth')
export class Driver_helthController {
  constructor(private readonly driver_helthService: Driver_helthService) {}

  @ApiOperation({ summary: "Yangi Driver_helth qo'shish" })
  @Post('add')
  create(@Body() createDriver_helthDto: Create_driver_helth_Dto) {
    return this.driver_helthService.create(createDriver_helthDto);
  }

  @ApiOperation({ summary: "Driver_helthlarini ko'rish" })
  @Post('all')
  findAll() {
    return this.driver_helthService.findAll();
  }

  @ApiOperation({ summary: "Driver_helthni id orqali ko'rish" })
  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.driver_helthService.findOne(+id);
  }

  @ApiOperation({ summary: 'Driver_helthni id orqali yangilash' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDriver_helthDto: UpdateDriver_helthDto,
  ) {
    return this.driver_helthService.update(+id, updateDriver_helthDto);
  }

  @ApiOperation({ summary: "Driver_helthni id orqali o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driver_helthService.remove(+id);
  }
}
