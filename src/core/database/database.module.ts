import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { repositoryProviders } from './repository/repository.providers';

@Global()
@Module({
  providers: [...databaseProviders, ...repositoryProviders],
  exports: [...databaseProviders, ...repositoryProviders],
})
export class DatabaseModule {}
