import { Module } from '@nestjs/common';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';
import { MessagesModule } from '../messages/messages.module';
import { MAILS_SERVICE } from '../../common/constants';

@Module({
  imports: [MessagesModule],
  controllers: [MailsController],
  providers: [
    {
      provide: MAILS_SERVICE,
      useClass: MailsService,
    },
  ],
})
export class MailsModule {}
