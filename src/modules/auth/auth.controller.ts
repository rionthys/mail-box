import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { UsersDto } from '../users/dto/users.dto';
import { IAuthService } from './interfaces/auth.interface';
import { AUTH_SERVICE } from '../../common/constants';
import { EitherDto } from '../../common/dto/either.dto';
import { MessageResponse } from '../../common/types/message.type';
import { AccessToken } from './types/token.type';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<EitherDto<AccessToken>> {
    return this._authService.login((req.user as EitherDto<UsersDto>).data);
  }

  @Post('register')
  async register(@Body() body: UsersDto): Promise<EitherDto<MessageResponse>> {
    return this._authService.register(body);
  }
}
