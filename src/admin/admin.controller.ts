import { JwtGuard } from './../guards/jwt.guard';
import { AdminGuard } from './../guards/Admin.guard';
import { CookieGetter } from './../decorators/cookieGetter.decorators';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.module';
import { HttpCode, Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { LoginAdminDto } from './dto/login.admindto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SelfGuard } from '../guards/self.guard';
@ApiTags('Admins')
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}
  @ApiOperation({ summary: 'register Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  regist(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.registration(createAdminDto, res);
  }

  //    Login Admin
  @ApiOperation({ summary: 'login Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.login(loginAdminDto, res);
  }
  //  LOGOUT Admin
  @ApiOperation({ summary: 'logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.logout(refreshToken, res);
  }
  //  REFRESH with id
  @UseGuards(AdminGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.refreshToken(+id, refreshToken, res);
  }
  //  ACTIVATE
  @ApiOperation({ summary: 'activate Admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminsService.activate(link);
  }
  //  FIND Admin
  @ApiOperation({ summary: "Adminlarni ko'rish" })
  @UseGuards(JwtGuard, AdminGuard)
  @Post('find')
  finAll() {
    return this.adminsService.findAll();
  }
  // FIND ONE WITH ID
  @ApiOperation({ summary: "Adminni idsi bilan ko'rish" })
  @UseGuards(JwtGuard, SelfGuard)
  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }
  // UPDATE ADMIN WITH ID
  @UseGuards(SelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }
  //DELETE ADMIN WITH ID
  @UseGuards(SelfGuard)
  @ApiOperation({ summary: "Adminni id orqali o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
