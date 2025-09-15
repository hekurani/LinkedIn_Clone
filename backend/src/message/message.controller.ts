import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/Public-Api.decorator';
import { UpdateMessageDTO } from './dto/update.message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Public()
  @Get('/messages')
  findAllMessages() {
    return this.messageService.findAllMessages();
  }

  ////per testim duhet te largohet me pas ne implementim front-back
  @Public()
  @Post('/sendMessage')
  async sendMessage(
    @Body('userId') userId: number,
    @Body('user2Id') user2Id: number,
    @Body('chatId') chatId: number,
    @Body('message') message: string,
  ) {
    return this.messageService.sendMessage(message, userId, user2Id, chatId);
  }

  @Get('/:id')
  findMessage(@Param('id') id: string) {
    return this.messageService.findOne(parseInt(id));
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(parseInt(id));
  }
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDTO,
  ) {
    return this.messageService.update(parseInt(id), updateMessageDto);
  }
}
