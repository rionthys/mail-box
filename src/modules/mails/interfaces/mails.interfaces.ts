import { EitherDto } from '../../../common/dto/either.dto';
import { MessagesDto } from '../../messages/dto/messages.dto';
import { MessageResponse } from '../../../common/types/message.type';

export interface IMailsServices {
  findAll(email: string): Promise<EitherDto<MessageResponse | MessagesDto[]>>;

  send(
    email: string,
    mail: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>>;

  update(
    email: string,
    id: number,
    mail: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>>;

  remove(email: string, id: number): Promise<EitherDto<MessageResponse>>;
}
