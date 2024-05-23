import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryOptions, QueryTypes } from 'sequelize';
import { EitherDto } from '../../../common/dto/either.dto';
import { BindOrReplacements } from 'sequelize/types/dialects/abstract/query-interface';
import { IDatabaseRequest } from '../intefaces/request.interface';
import { QueryResult } from './query-result.type';

@Injectable()
export class RequestRepository implements IDatabaseRequest {
  constructor(
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  insert(
    table: string,
    values: BindOrReplacements,
  ): Promise<EitherDto<QueryResult>> {
    const keys = Object.keys(values).join(', ');
    const placeholders = Object.keys(values)
      .map((key) => `:${key}`)
      .join(', ');
    const options: QueryOptions = {
      type: QueryTypes.INSERT,
      replacements: values,
    };

    return this.request(
      `INSERT INTO ${table} (${keys}) VALUES(${placeholders})`,
      options,
    );
  }

  async select<T>(
    table: string,
    values?: BindOrReplacements,
  ): Promise<EitherDto<T>> {
    const where = Object.keys(values)
      .map((key) => `${key} = :${key}`)
      .join(' AND ');
    const options: QueryOptions = {
      type: QueryTypes.SELECT,
      replacements: values,
    };

    let sql = `SELECT * FROM ${table}`;
    sql = where.length > 0 ? `${sql} WHERE ${where}` : sql;
    const result = await this.request(sql, options);

    return {
      success: result.success,
      data: result.data as T,
    };
  }

  update(
    table: string,
    condition: BindOrReplacements,
    values: BindOrReplacements,
  ): Promise<EitherDto<QueryResult>> {
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
    };

    const sql = `UPDATE ${table} SET ${placeholders} WHERE ${where}`;

    return this.request(sql, options);
  }

  delete(
    table: string,
    condition: BindOrReplacements,
  ): Promise<EitherDto<QueryResult>> {
    const where: string = Object.keys(condition)
      .map((key) => `${key} = :${key}`)
      .join(' AND ');

    const options = {
      type: QueryTypes.UPDATE,
      replacements: condition,
    };

    const sql = `DELETE FROM ${table} WHERE ${where}`;

    return this.request(sql, options);
  }

  private async request(
    sql: string,
    options: QueryOptions,
  ): Promise<EitherDto<QueryResult>> {
    const response: EitherDto<QueryResult> = {
      success: false,
      data: undefined,
    };

    try {
      response.data = await this.sequelize.query(sql, options);
      response.success = true;
    } catch (error) {
      response.data = error;
    }

    return response;
  }
}
