import { AdminGuard } from './../guards/admin.guard';
import { JwtGuard } from './../guards/jwt.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpCode, Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateDispatcherDto } from './dto/create-dispatcher.dto';
import { DispatcherService } from './dispatcher.service';
import { Dispatcher } from './models/dispatcher.model';
import { LoginDispatcherDto } from './dto/login.dispatcherdto';
import { CookieGetter } from '../decorators/cookieGetter.decorators';
import { DispatcherGuard } from '../guards/dispatcher.guard';
import { UpdateDispatcherDto } from './dto/update-dispatcher.dto';
import { SelfGuard } from '../guards/self.guard';
@ApiTags('Dispatchers')
@Controller('dispatcher')
export class DispatchersController {
  constructor(private readonly DispatcherService: DispatcherService) {}
  @ApiOperation({ summary: 'register Dispatcher' })
  @ApiResponse({ status: 201, type: Dispatcher })
  @Post('signup')
  regist(
    @Body() createDispatcherDto: CreateDispatcherDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.DispatcherService.registration(createDispatcherDto, res);
  }

  //    Login Dispatcher
  @ApiOperation({ summary: 'login Dispatcher' })
  @ApiResponse({ status: 200, type: Dispatcher })
  @Post('signin')
  login(
    @Body() loginDispatcherDto: LoginDispatcherDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.DispatcherService.login(loginDispatcherDto, res);
  }

  //  LOGOUT Dispatcher
  @ApiOperation({ summary: 'logout Dispatcher' })
  @ApiResponse({ status: 200, type: Dispatcher })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.DispatcherService.logout(refreshToken, res);
  }

  //  REFRESH with id
  // @UseGuards(JwtGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.DispatcherService.refreshToken(+id, refreshToken, res);
  }

  //  ACTIVATE
  @ApiOperation({ summary: 'activate Dispatcher' })
  @ApiResponse({ status: 200, type: [Dispatcher] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.DispatcherService.activate(link);
  }

  //  FIND Dispatcher
  @ApiOperation({ summary: "Dispatcherlarni ko'rish" })
  @UseGuards(JwtGuard, AdminGuard)
  @Post('find')
  finAll() {
    return this.DispatcherService.findAll();
  }

  // FIND ONE WITH ID
  @ApiOperation({ summary: "Dispatcherlarni idsi bilan ko'rish" })
  @UseGuards(JwtGuard, DispatcherGuard, SelfGuard)
  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.DispatcherService.findOne(+id);
  }

  // UPDATE Dispatcher WITH ID
  @UseGuards(JwtGuard, DispatcherGuard, SelfGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDispatcherDto: UpdateDispatcherDto,
  ) {
    return this.DispatcherService.update(+id, updateDispatcherDto);
  }

  //DELETE Dispatcher WITH ID
  @UseGuards(JwtGuard, DispatcherGuard, SelfGuard)
  @ApiOperation({ summary: "Dispatcherni id orqali o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.DispatcherService.remove(+id);
  }
}
