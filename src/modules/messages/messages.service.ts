import { Inject, Injectable } from '@nestjs/common';
import { MessagesDto } from './dto/messages.dto';
import { DATABASE_REQUEST } from '../../common/constants';
import { EitherDto } from '../../common/dto/either.dto';
import { IDatabaseRequest } from '../../core/database/intefaces/request.interface';
import { IMessagesInterface } from './interfaces/messages.interface';
import { MessageResponse } from '../../common/types/message.type';
import { QueryResult } from '../../core/database/repository/query-result.type';
import { ResponseService } from '../../utils/response.service';

@Injectable()
export class MessagesService implements IMessagesInterface {
  private readonly _table = 'messages';

  constructor(
    @Inject(DATABASE_REQUEST)
    private readonly _databaseRequest: IDatabaseRequest,
    private readonly _responseService: ResponseService,
  ) {}

  find(
    message: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse | MessagesDto | MessagesDto[]>> {
    return this._databaseRequest.select<
      MessageResponse | MessagesDto | MessagesDto[]
    >(this._table, {
      ...message,
    });
  }

  async create(
    message: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>> {
    const result: EitherDto<QueryResult> = await this._databaseRequest.insert(
      this._table,
      { ...message },
    );

    return this._responseService.create<MessageResponse>(
      result,
      'successfully created',
    );
  }

  async update(
    condition: Partial<MessagesDto>,
    message: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>> {
    const result: EitherDto<QueryResult> = await this._databaseRequest.update(
      this._table,
      { ...condition },
      { ...message },
    );

    return this._responseService.create<MessageResponse>(
      result,
      'successfully updated',
    );
  }

  async delete(
    message: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>> {
    const result: EitherDto<QueryResult> = await this._databaseRequest.delete(
      this._table,
      { ...message },
    );

    return this._responseService.create<MessageResponse>(
      result,
      'successfully deleted',
    );
  }
}
