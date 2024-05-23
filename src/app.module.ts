import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ModulesModule } from './modules/modules.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DatabaseModule, UtilsModule, ModulesModule],
})
export class AppModule {}
