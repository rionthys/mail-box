import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EitherDto } from '../../common/dto/either.dto';
import { IMailsServices } from './interfaces/mails.interfaces';
import { MAILS_SERVICE } from '../../common/constants';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MessagesDto } from '../messages/dto/messages.dto';
import { MessageResponse } from '../../common/types/message.type';
import { UsersDto } from '../users/dto/users.dto';

@Controller('mails')
export class MailsController {
  constructor(
    @Inject(MAILS_SERVICE)
    private readonly _mailsService: IMailsServices,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(
    @Req() request: Request,
  ): Promise<EitherDto<MessageResponse | MessagesDto[]>> {
    console.log(request.user);
    return this._mailsService.findAll((request.user as UsersDto).email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send')
  send(
    @Req() request: Request,
    @Body() data: Partial<MessagesDto>,
  ): Promise<EitherDto<MessageResponse>> {
    return this._mailsService.send((request.user as UsersDto).email, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  edit(
    @Req() request: Request,
    @Body() data: any,
    @Param('id') id: string,
  ): Promise<EitherDto<MessageResponse>> {
    return this._mailsService.update(
      (request.user as UsersDto).email,
      +id,
      data,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<EitherDto<MessageResponse>> {
    return this._mailsService.remove((request.user as UsersDto).email, +id);
  }
}
