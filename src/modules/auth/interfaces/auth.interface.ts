import { EitherDto } from '../../../common/dto/either.dto';
import { MessageResponse } from '../../../common/types/message.type';
import { UsersDto } from '../../users/dto/users.dto';
import { AccessToken } from '../types/token.type';

export interface IAuthService {
  validateUser(
    username: string,
    password: string,
  ): Promise<EitherDto<MessageResponse | UsersDto>>;

  login(user: UsersDto): Promise<EitherDto<AccessToken>>;

  register(user: UsersDto): Promise<EitherDto<MessageResponse>>;
}
