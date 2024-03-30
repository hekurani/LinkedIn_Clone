import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChatRoomService } from './chatroom.service';
import { Public } from 'src/auth/decorators/Public-Api.decorator';
import { CreateChatRoomDto } from './dto/create.chatroom.dto';
@Controller('chatroom')
export class ChatroomController {
    constructor(private readonly chatService:ChatRoomService) {}

    @Public()//per testim duhet te largohet me pas ne implementim front-back
    @Get('/allMessages/:chatId')  //me get gjitha mesazhet qe i takojn nje chati
    findAllMessages(@Param('chatId') id:number){
        return this.chatService.findAllMessages(id);
    }
    @Public()
    @Get('/allChatRooms')//me get gjitha chatrooms
    getAllChatRooms(){
        return this.chatService.getAllChatRooms();
    }
    @Public()
    @Get('/chatByUser/:id')//me get chatrooms per user
    getChatRoomByUser(@Param('id') id:number){
        return this.chatService.getChatRoomByUser(id);
    }
    @Get('/:id')
    findOne(@Param('id') id:string){
        return this.chatService.findOne(parseInt(id));
    }
    @Public()
    @Post('/createChat')
    createChat(@Body() body:CreateChatRoomDto){
        console.log(body);
        return this.chatService.createChatRoom(body.userOneId,body.userTwoId);
    }
    @Delete('/:id')
    remove(@Param('id') id:string){
        return this.chatService.remove(parseInt(id));
    }
    
/*     @Put('/:id')
    async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDTO) {
      return this.chatService.update(parseInt(id), updateMessageDto);
    } */
}
