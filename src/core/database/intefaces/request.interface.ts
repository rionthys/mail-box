import { EitherDto } from '../../../common/dto/either.dto';
import { BindOrReplacements } from 'sequelize/types/dialects/abstract/query-interface';

export interface IDatabaseRequest {
  insert(table: string, values: BindOrReplacements): Promise<EitherDto>;

  select(table: string, values?: BindOrReplacements): Promise<EitherDto>;

  update(
    table: string,
    condition: BindOrReplacements,
    values?: BindOrReplacements,
  ): Promise<EitherDto>;
}
