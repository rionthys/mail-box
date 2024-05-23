import { EitherDto } from '../../../common/dto/either.dto';
import { BindOrReplacements } from 'sequelize/types/dialects/abstract/query-interface';
import { QueryResult } from '../repository/query-result.type';

export interface IDatabaseRequest {
  insert(
    table: string,
    values: BindOrReplacements,
  ): Promise<EitherDto<QueryResult>>;

  select<T>(table: string, values?: BindOrReplacements): Promise<EitherDto<T>>;

  update(
    table: string,
    condition: BindOrReplacements,
    values?: BindOrReplacements,
  ): Promise<EitherDto<QueryResult>>;

  delete(
    table: string,
    condition: BindOrReplacements,
  ): Promise<EitherDto<QueryResult>>;
}
