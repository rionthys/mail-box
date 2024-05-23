import { Injectable } from '@nestjs/common';
import { EitherDto } from '../common/dto/either.dto';
import { QueryResult } from '../core/database/repository/query-result.type';

@Injectable()
export class ResponseService {
  create<T>(
    result: EitherDto<QueryResult>,
    successMessage: string,
  ): EitherDto<T> {
    const response: EitherDto<T> = {
      success: false,
      data: undefined,
    };

    if (
      result.success &&
      Array.isArray(result.data) &&
      (result.data as number[])[1] > 0
    ) {
      response.success = true;
      response.data = { message: successMessage } as unknown as T;
    } else {
      response.data = result.data as T;
    }

    return response;
  }
}
