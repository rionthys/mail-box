import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryOptions, QueryTypes } from 'sequelize';
import { EitherDto } from '../../../common/dto/either.dto';
import { BindOrReplacements } from 'sequelize/types/dialects/abstract/query-interface';
import { IDatabaseRequest } from '../intefaces/request.interface';

@Injectable()
export class RequestRepository implements IDatabaseRequest {
  constructor(
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  async insert(table: string, values: BindOrReplacements): Promise<EitherDto> {
    const keys = Object.keys(values).join(', ');
    const placeholders = Object.keys(values)
      .map((key) => `:${key}`)
      .join(', ');
    const options: QueryOptions = {
      type: QueryTypes.INSERT,
      replacements: values,
      plain: true,
    };

    return this.request(
      `INSERT INTO ${table} (${keys}) VALUES(${placeholders})`,
      options,
    );
  }

  async select(table: string, values?: BindOrReplacements): Promise<EitherDto> {
    const where = Object.keys(values)
      .map((key) => `${key} = :${key}`)
      .join(' AND ');
    const options: QueryOptions = {
      type: QueryTypes.SELECT,
      replacements: values,
      plain: true,
    };

    let sql = `SELECT * FROM ${table}`;
    sql = where.length > 0 ? `${sql} WHERE ${where}` : sql;

    return this.request(sql, options);
  }

  async update(
    table: string,
    condition: BindOrReplacements,
    values: BindOrReplacements,
  ): Promise<EitherDto> {
    const placeholders: string = Object.keys(values)
      .map((key) => `${key} = :${key}`)
      .join(', ');

    const where: string = Object.keys(condition)
      .map((key) => `${key} = :where_${key}`)
      .join(' AND ');

    const conditionValues: BindOrReplacements = Object.fromEntries(
      Object.entries(condition).map(([key, value]) => [`where_${key}`, value]),
    );

    const options = {
      type: QueryTypes.UPDATE,
      replacements: { ...conditionValues, ...values },
      plain: true,
    };

    const sql = `UPDATE ${table} SET ${placeholders} WHERE ${where}`;

    return this.request(sql, options);
  }

  private async request(
    sql: string,
    options: QueryOptions,
  ): Promise<EitherDto> {
    const response: EitherDto = { success: false, data: undefined };

    try {
      response.data = await this.sequelize.query(sql, options);
      response.success = true;
    } catch (error) {
      response.data = error;
    }

    return response;
  }
}
