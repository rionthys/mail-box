import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { USERS_SERVICE } from '../../common/constants';

@Module({
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  exports: [USERS_SERVICE],
})
export class UsersModule {}
