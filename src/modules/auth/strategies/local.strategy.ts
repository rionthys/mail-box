import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { EitherDto } from '../../../common/dto/either.dto';
import { AUTH_SERVICE } from '../../../common/constants';
import { IAuthService } from '../interfaces/auth.interface';
import { MessageResponse } from '../../../common/types/message.type';
import { UsersDto } from '../../users/dto/users.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthService,
  ) {
    super();
  }

  validate(
    username: string,
    password: string,
  ): Promise<EitherDto<MessageResponse | UsersDto>> {
    return this._authService.validateUser(username, password);
  }
}
