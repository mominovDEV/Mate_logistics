import { SelfGuard } from './../guards/self.guard';
import { Create_Vehicles_Dto } from './dto/create-vehicles.dto';
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
import { VehiclesService } from './vehicles.service';
import { UpdateVehiclesDto } from './dto/update-vehicles.dto';
@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOperation({ summary: "Yangi Vehicles qo'shish" })
  @Post('add')
  create(@Body() createVehiclesDto: Create_Vehicles_Dto) {
    return this.vehiclesService.create(createVehiclesDto);
  }

  @ApiOperation({ summary: "Vehicleslarini ko'rish" })
  @Post('all')
  findAll() {
    return this.vehiclesService.findAll();
  }

  @ApiOperation({ summary: "Vehiclesni id orqali ko'rish" })
  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Vehiclesni id orqali yangilash' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehiclesDto: UpdateVehiclesDto,
  ) {
    return this.vehiclesService.update(+id, updateVehiclesDto);
  }

  @ApiOperation({ summary: "Vehiclesni id orqali o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
