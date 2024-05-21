import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UsersDto } from './dto/users.dto';
import { DATABASE_REQUEST } from '../../common/constants';
import { EitherDto } from '../../common/dto/either.dto';
import { IDatabaseRequest } from '../../core/database/intefaces/request.interface';
import { IUsersService } from './interfaces/users.interface';

dotenv.config();

@Injectable()
export class UsersService implements IUsersService {
  private readonly table = 'users';

  constructor(
    @Inject(DATABASE_REQUEST)
    private readonly databaseRequest: IDatabaseRequest,
  ) {}

  findOne(user: Partial<UsersDto>): Promise<EitherDto> {
    return this.databaseRequest.select(this.table, { ...user });
  }

  update(
    condition: Partial<UsersDto>,
    user: Partial<UsersDto>,
  ): Promise<EitherDto> {
    return this.databaseRequest.update(
      this.table,
      { ...condition },
      { ...user },
    );
  }

  async create(user: UsersDto): Promise<EitherDto> {
    user.password = await bcrypt.hash(user.password, process.env.SALT);
    return this.databaseRequest.insert(this.table, { ...user });
  }
}
