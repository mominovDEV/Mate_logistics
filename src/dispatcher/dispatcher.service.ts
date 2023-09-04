import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BadGatewayException,
  ForbiddenException,
  HttpException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt/dist';
import { MailService } from '../mail/mail.service';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateDispatcherDto } from './dto/create-dispatcher.dto';
import { Dispatcher } from './models/dispatcher.model';
import { UpdateDispatcherDto } from './dto/update-dispatcher.dto';
import { LoginDispatcherDto } from './dto/login.dispatcherdto';
import { log } from 'console';

@Injectable()
export class DispatcherService {
  constructor(
    @InjectModel(Dispatcher) private readonly DispatcherRepo: typeof Dispatcher,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  //  Registration
  async registration(createDispatcherDto: CreateDispatcherDto, res: Response) {
    const Dispatcher = await this.DispatcherRepo.findOne({
      where: { username: createDispatcherDto.username },
    });

    if (Dispatcher) {
      throw new BadGatewayException('Dispatchername already exists!');
    }

    const hashed_password = await bcrypt.hash(createDispatcherDto.password, 7);
    const newDispatcher = await this.DispatcherRepo.create({
      ...createDispatcherDto,
      hashed_password: hashed_password,
    });

    const tokens = await this.getTokens(newDispatcher);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const uniqueKey: string = uuidv4();
    const updateDispatcher = await this.DispatcherRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newDispatcher.id }, returning: true },
    );
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendDispatcherConfirmation(updateDispatcher[1][0]);
    } catch (error) {
      console.log('123456780987654321', error);
    }

    const response = {
      message: 'Dispatcher registired',
      Dispatcher: updateDispatcher[1][0],
      tokens: tokens,
    };
    return response;
  }

  //    Get Token
  async getTokens(dispatcher: Dispatcher) {
    const jwtPayload = {
      id: dispatcher.id,
      is_active: dispatcher.is_active,
      role: 'Dispetcher',
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  //    Activate Dispatcher
  async activate(link: string) {
    if (!link) {
      throw new BadGatewayException('activation link not found');
    }

    const updatedDispatcher = await this.DispatcherRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updatedDispatcher[1][0]) {
      throw new BadGatewayException('Dispatcher already activated');
    }

    const response = {
      message: 'Dispatcher activated successfully',
      Dispatcher: updatedDispatcher,
    };
    return response;
  }

  //  LOGIN
  async login(loginDispatcherDto: LoginDispatcherDto, res: Response) {
    const Dispatcher = await this.DispatcherRepo.findOne({
      where: { email: loginDispatcherDto.email },
    });

    if (!Dispatcher) {
      throw new BadRequestException("Dispatcher doesn't exist");
    }

    if (
      !bcrypt.compareSync(
        loginDispatcherDto.password,
        Dispatcher.hashed_password,
      )
    ) {
      throw new BadRequestException("password didn't match");
    }

    const tokens = await this.getTokens(Dispatcher);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedDispatcher = await this.DispatcherRepo.update(
      { hashed_refresh_token },
      { where: { id: Dispatcher.id }, returning: true },
    );
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendDispatcherConfirmation(
        updatedDispatcher[1][0],
      );
    } catch (error) {
      console.log(error);
    }
    return {
      message: 'Dispatcher logged in',
      Dispatcher: updatedDispatcher[1][0],
      tokens,
    };
  }

  //  LOGOUT
  async logout(refreshToken: string, res: Response) {
    try {
      const DispatcherData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!DispatcherData) {
        throw new BadRequestException('Dispatcher not found');
      }
      const updatedDispatcher = await this.DispatcherRepo.update(
        { hashed_refresh_token: null },
        { where: { id: DispatcherData.id }, returning: true },
      );
      res.clearCookie('refreshToken');
      const response = {
        message: 'Dispatcher logged out successfully',
        Dispatcher: updatedDispatcher[1][0],
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //  REFRESH TOKEN
  async refreshToken(
    Dispatcher_id: number,
    refreshToken: string,
    res: Response,
  ) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (Dispatcher_id != decodedToken['id']) {
      throw new BadRequestException('Dispatcher id not found');
    }
    const Dispatcher = await this.DispatcherRepo.findOne({
      where: { id: Dispatcher_id },
    });
    if (!Dispatcher || !Dispatcher.hashed_refresh_token) {
      throw new BadRequestException('Dispatcher not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      Dispatcher.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('forbidden');
    }
    const tokens = await this.getTokens(Dispatcher);
    const hashed_password_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedDispatcher = await this.DispatcherRepo.update(
      { hashed_refresh_token: hashed_password_token },
      { where: { id: Dispatcher.id }, returning: true },
    );

    res.cookie('RefreshToken:', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Dispatcher refreshed',
      Dispatcher: updatedDispatcher[1][0],
      tokens,
    };
    return response;
  }
  //  FIND Dispatcher
  async findAll(): Promise<Dispatcher[]> {
    const Dispatcher = await this.DispatcherRepo.findAll({
      include: { all: true },
    });
    if (Dispatcher.length > 0) {
      return Dispatcher;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  // FIND ONE WITH ID
  async findOne(id: number) {
    const Dispatcher = await this.DispatcherRepo.findByPk(id, {
      include: { all: true },
    });
    if (Dispatcher) {
      return Dispatcher;
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  // UPDATE Dispatcher WITH ID
  update(id: number, updateDispatcherDto: UpdateDispatcherDto) {
    return `This action updates a #${id} baholash`;
  }

  //DELETE Dispatcher WITH ID
  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.DispatcherRepo.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: 'Deleted succesfully' };
    }
    throw new HttpException('Not found with such id', HttpStatus.NOT_FOUND);
  }

  async updateDispatcher(
    id: number,
    updateDispatcherDto: UpdateDispatcherDto,
  ): Promise<Dispatcher> {
    const Dispatcher = await this.DispatcherRepo.update(updateDispatcherDto, {
      where: { id },
      returning: true,
    });
    console.log(Dispatcher[1][0].dataValues);
    return Dispatcher[1][0].dataValues;
  }
}
