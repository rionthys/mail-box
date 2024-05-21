import { EitherDto } from '../../../common/dto/either.dto';
import { UsersDto } from '../dto/users.dto';

export interface IUsersService {
  findOne(user: Partial<UsersDto>): Promise<EitherDto>;

  update(
    condition: Partial<UsersDto>,
    user: Partial<UsersDto>,
  ): Promise<EitherDto>;

  create(user: UsersDto): Promise<EitherDto>;
}
