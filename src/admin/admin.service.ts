import { UpdateAdminDto } from './dto/update-admin.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BadGatewayException,
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { LoginAdminDto } from './dto/login.admindto';
import { MailService } from '../mail/mail.service';
import { HttpStatus } from '@nestjs/common/enums';
import { Admin } from './models/admin.module';
@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private readonly AdminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  //  Registration
  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const Admin = await this.AdminRepo.findOne({
      where: { username: createAdminDto.username },
    });

    if (Admin) {
      throw new BadGatewayException('Admin already exists!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.AdminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    });

    const tokens = await this.getTokens(newAdmin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const uniqueKey: string = uuidv4();
    const updateAdmin = await this.AdminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newAdmin.id }, returning: true },
    );
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendAdminConfirmation(updateAdmin[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'Admin registired',
      Admin: updateAdmin[1][0],
      tokens: tokens,
    };
    return response;
  }

  //    Get Token
  async getTokens(Admin: Admin) {
    const jwtPayload = {
      id: Admin.id,
      is_active: Admin.is_active,
      role: 'Admin',
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  //    Activate Admin
  async activate(link: string) {
    if (!link) {
      throw new BadGatewayException('activation link not found');
    }

    const updatedAdmin = await this.AdminRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updatedAdmin[1][0]) {
      throw new BadGatewayException('Admin already activated');
    }

    const response = {
      message: 'Admin activated successfully',
      Admin: updatedAdmin,
    };
    return response;
  }

  //  LOGIN
  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const Admin = await this.AdminRepo.findOne({
      where: { email: loginAdminDto.email },
    });

    if (!Admin) {
      throw new BadRequestException("Admin doesn't exist");
    }

    if (!bcrypt.compareSync(loginAdminDto.password, Admin.hashed_password)) {
      throw new BadRequestException("password didn't match");
    }

    const tokens = await this.getTokens(Admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedAdmin = await this.AdminRepo.update(
      { hashed_refresh_token },
      { where: { id: Admin.id }, returning: true },
    );
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return {
      message: 'Admin logged in',
      Admin: updatedAdmin[1][0],
      tokens,
    };
  }

  //  LOGOUT
  async logout(refreshToken: string, res: Response) {
    const AdminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    console.log('1234', AdminData);

    if (!AdminData) {
      throw new BadRequestException('Admin not found');
    }
    const updatedAdmin = await this.AdminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: AdminData.id }, returning: true },
    );
    res.clearCookie('refreshToken');
    const response = {
      message: 'Admin logged out successfully',
      Admin: updatedAdmin[1][0],
    };
    return response;
  }

  //  REFRESH TOKEN
  async refreshToken(Admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (Admin_id != decodedToken['id']) {
      throw new BadRequestException('Admin id not found');
    }
    const Admin = await this.AdminRepo.findOne({ where: { id: Admin_id } });
    if (!Admin || !Admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      Admin.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('forbidden');
    }
    const tokens = await this.getTokens(Admin);
    const hashed_password_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedAdmin = await this.AdminRepo.update(
      { hashed_refresh_token: hashed_password_token },
      { where: { id: Admin.id }, returning: true },
    );

    res.cookie('RefreshToken:', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin refreshed',
      Admin: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }

  //  FIND Admin
  async findAll(): Promise<Admin[]> {
    const admin = await this.AdminRepo.findAll({
      include: { all: true },
    });
    if (admin.length > 0) {
      return admin;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  // FIND ONE WITH ID
  async findOne(id: number) {
    const admin = await this.AdminRepo.findByPk(id, {
      include: { all: true },
    });
    if (admin) {
      return admin;
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  // UPDATE ADMIN WITH ID
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.AdminRepo.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin not found with such id');
    }
    const updatedAdmin = await this.AdminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });

    if (!updatedAdmin[0]) {
      return admin;
    }
    return updatedAdmin[1][0].dataValues;
  }

  //DELETE ADMIN WITH ID
  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.AdminRepo.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: 'Deleted succesfully' };
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    const admin = await this.AdminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    console.log(admin[1][0].dataValues);
    return admin[1][0].dataValues;
  }
}
