import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MESSAGES_SERVICE } from '../../common/constants';

@Module({
  providers: [
    {
      provide: MESSAGES_SERVICE,
      useClass: MessagesService,
    },
  ],
  exports: [MESSAGES_SERVICE],
})
export class MessagesModule {}
