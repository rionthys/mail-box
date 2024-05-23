import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersDto } from '../users/dto/users.dto';
import { EitherDto } from '../../common/dto/either.dto';
import * as bcrypt from 'bcrypt';
import { IUsersService } from '../users/interfaces/users.interface';
import { USERS_SERVICE } from '../../common/constants';
import { PayloadDto } from './dto/payload.dto';
import { MessageResponse } from '../../common/types/message.type';
import { IAuthService } from './interfaces/auth.interface';
import { AccessToken } from './types/token.type';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly _usersService: IUsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<EitherDto<MessageResponse | UsersDto>> {
    const response: EitherDto<MessageResponse | UsersDto> = {
      success: false,
      data: undefined,
    };
    const result = await this._usersService.find({
      username,
    });

    if (result.success) {
      const user: UsersDto = result.data as UsersDto;
      if (user && (await bcrypt.compare(password, user.password))) {
        user.password = undefined;
        response.data = user;
      } else {
        response.data = { message: 'Wrong login or password' };
      }
    }

    return response;
  }

  async login(user: UsersDto): Promise<EitherDto<AccessToken>> {
    const payload: PayloadDto = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };

    return {
      success: true,
      data: { access_token: this._jwtService.sign(payload) },
    };
  }

  async register(user: UsersDto): Promise<EitherDto<MessageResponse>> {
    const response: EitherDto<any> = { success: true, data: undefined };
    if (!user.username || !user.password) {
      response.success = false;
      response.data = { message: 'Wrong login or password' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      response.success = false;
      response.data = { message: 'Wrong email' };
    }

    if (response.success) {
      const newUser = await this._usersService.create(user);
      if (newUser.success) {
        response.data = { message: 'Successfully registered' };
      } else {
        response.success = false;
        response.data = { message: 'Error creating user' };
      }
    }

    return response;
  }
}
