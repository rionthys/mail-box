import { EitherDto } from '../../../common/dto/either.dto';
import { UsersDto } from '../dto/users.dto';
import { MessageResponse } from '../../../common/types/message.type';

export interface IUsersService {
  find(user?: Partial<UsersDto>): Promise<EitherDto<UsersDto | UsersDto[]>>;

  update(
    condition: Partial<UsersDto>,
    user: Partial<UsersDto>,
  ): Promise<EitherDto<MessageResponse>>;

  create(user: UsersDto): Promise<EitherDto<MessageResponse>>;
}
