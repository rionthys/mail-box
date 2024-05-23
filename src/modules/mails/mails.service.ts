import { Inject, Injectable } from '@nestjs/common';
import { IMessagesInterface } from '../messages/interfaces/messages.interface';
import { MESSAGES_SERVICE } from '../../common/constants';
import { EitherDto } from '../../common/dto/either.dto';
import { IMailsServices } from './interfaces/mails.interfaces';
import { MessagesDto } from '../messages/dto/messages.dto';
import { MessageResponse } from '../../common/types/message.type';

@Injectable()
export class MailsService implements IMailsServices {
  constructor(
    @Inject(MESSAGES_SERVICE)
    private readonly _messagesService: IMessagesInterface,
  ) {}

  async findAll(
    email: string,
  ): Promise<EitherDto<MessageResponse | MessagesDto[]>> {
    return (await this._messagesService.find({
      from_email: email,
    })) as EitherDto<MessageResponse | MessagesDto[]>;
  }

  send(
    email: string,
    mail: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>> {
    mail = { ...mail, from_email: email, read: false };
    return this._messagesService.create(mail);
  }

  async update(
    email: string,
    id: number,
    mail: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>> {
    let response: EitherDto<MessageResponse> = {
      success: false,
      data: { message: 'permission denied ' },
    };
    const result = await this._messagesService.find({ from_email: email });
    if (result.success) {
      if ((result.data as MessagesDto[]).find((message) => message.id === id)) {
        response = (await this._messagesService.update(
          { id },
          mail,
        )) as EitherDto<MessageResponse>;
      }
    }

    return response;
  }

  async remove(email: string, id: number): Promise<EitherDto<MessageResponse>> {
    let response: EitherDto<MessageResponse> = {
      success: false,
      data: { message: 'permission denied ' },
    };
    const result = await this._messagesService.find({ from_email: email });
    if (result.success) {
      if ((result.data as MessagesDto[]).find((message) => message.id === id)) {
        response = (await this._messagesService.delete({
          id,
        })) as EitherDto<MessageResponse>;
      }
    }
    return response;
  }
}
