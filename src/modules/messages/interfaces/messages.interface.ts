import { EitherDto } from '../../../common/dto/either.dto';
import { MessagesDto } from '../dto/messages.dto';
import { MessageResponse } from '../../../common/types/message.type';

export interface IMessagesInterface {
  find(
    message: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse | MessagesDto | MessagesDto[]>>;

  create(message: Partial<MessagesDto>): Promise<EitherDto<MessageResponse>>;

  update(
    condition: Partial<MessagesDto>,
    message: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>>;

  delete(message: Partial<MessagesDto>): Promise<EitherDto<MessageResponse>>;
}
