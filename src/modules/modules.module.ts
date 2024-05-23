import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mails/mails.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, AuthModule, MessagesModule, MailsModule],
  exports: [UsersModule, AuthModule, MessagesModule, MailsModule],
})
export class ModulesModule {}
