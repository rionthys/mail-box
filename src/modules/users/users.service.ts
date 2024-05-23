import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UsersDto } from './dto/users.dto';
import { DATABASE_REQUEST } from '../../common/constants';
import { EitherDto } from '../../common/dto/either.dto';
import { IDatabaseRequest } from '../../core/database/intefaces/request.interface';
import { IUsersService } from './interfaces/users.interface';
import { MessageResponse } from '../../common/types/message.type';
import { QueryResult } from '../../core/database/repository/query-result.type';
import { ResponseService } from '../../utils/response.service';

dotenv.config();

@Injectable()
export class UsersService implements IUsersService {
  private readonly table = 'users';

  constructor(
    @Inject(DATABASE_REQUEST)
    private readonly _databaseRequest: IDatabaseRequest,
    private readonly _responseService: ResponseService,
  ) {}

  async find(
    user: Partial<UsersDto>,
  ): Promise<EitherDto<UsersDto | UsersDto[]>> {
    const users = await this._databaseRequest.select<UsersDto | UsersDto[]>(
      this.table,
      {
        ...user,
      },
    );

    users.data =
      Array.isArray(users.data) && users.data.length > 1
        ? users.data
        : users.data[0];

    return users;
  }

  async update(
    condition: Partial<UsersDto>,
    user: Partial<UsersDto>,
  ): Promise<EitherDto<MessageResponse>> {
    const result: EitherDto<QueryResult> = await this._databaseRequest.update(
      this.table,
      { ...condition },
      { ...user },
    );

    return this._responseService.create<MessageResponse>(
      result,
      'successfully updated',
    );
  }

  async create(user: UsersDto): Promise<EitherDto<MessageResponse>> {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result: EitherDto<QueryResult> = await this._databaseRequest.insert(
      this.table,
      { ...user },
    );
    return this._responseService.create<MessageResponse>(
      result,
      'successfully created',
    );
  }
}
