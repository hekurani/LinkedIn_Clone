import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from './chat.entity';
import { Message } from '../message/Entity/message.entity';
import { User } from 'src/users/user.entity';
@Injectable()
export class ChatRoomService {
  constructor(@InjectRepository(ChatRoom) private repo: Repository<ChatRoom> ,@InjectRepository(User) private userRepository:Repository<User>,@InjectRepository(Message) private messageRepository: Repository<Message>) {}

    async createChatRoom(userOneId:number,userTwoId:number){
      console.log(userOneId,userTwoId)
      const userOne = await this.userRepository.findOne({where:{id:userOneId}});
      const userTwo = await this.userRepository.findOne({where:{id:userTwoId}});
       const chat =  this.repo.create({user1:userOne,user2:userTwo});
        await this.repo.save(chat);
        return chat;
    }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    let chatroom = await this.repo.find({ where: { id: id } ,relations:['user1','user2']});
    return chatroom;
  }

  

  async remove(id: number) {
    const chat = await this.repo.findOne({where:{id}});
    if (!chat) {
      throw new NotFoundException(
        'The chat that you wanted to delete doesnt exist at all!',
      );
    }
    return this.repo.remove(chat);
  }


  async findAllMessages(chatId: number) :Promise<Message[]>{//metod qe gjen gjitha mesazhet ne baz te chatId
    return this.messageRepository.find({ where: { chat: { id: chatId } },
    relations: ['user']});
  }


  async update(id: number, attrs: Partial<ChatRoom>) {
    const chat = await this.findOne(id);
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    Object.assign(chat, attrs);
    return this.repo.save(chat);
  }
  async getAllChatRooms() :Promise<ChatRoom[]>{//metod qe gjen gjitha chatrooms{
    //also user object to return
    return this.repo.find({relations:['user1','user2']}) ;
  }

/*   async sendMessage1(senderId: string, receiverId: string, messageText: string) {//metod per me send message e krijon nje chat nese nuk ekziston
    // id i qesim ne number preseim number
    const senderIdNumber = parseInt(senderId);
    const receiverIdNumber = parseInt(receiverId);
  
    // queri qe na mundeson me check a ekziston nje chat i krijum prej tyne 2 personave ma heret
    let chat = await this.chatRepository
      .createQueryBuilder("chat")
      .where("(chat.participant1Id = :senderId AND chat.participant2Id = :receiverId) OR (chat.participant1Id = :receiverId AND chat.participant2Id = :senderId)", { senderId: senderIdNumber, receiverId: receiverIdNumber })
      .getOne();
  
    // nese jo e krijojm chatin mes tyre
    if (!chat) {
      const sender = await this.userRepository.findOne({ where: { id: senderIdNumber } });
      const receiver = await this.userRepository.findOne({ where: { id: receiverIdNumber } });
  
      if (!sender || !receiver) {
        throw new NotFoundException('Sender or receiver not found');
      }
  
      chat = this.chatRepository.create({ participant1: sender, participant2: receiver }); //krijojm chatin
      await this.chatRepository.save(chat); //ebejm save
    }
  
    //per siguri mirepo eshte redundant
    const sender = await this.userRepository.findOne({ where: { id: senderIdNumber } });
    const message = this.repo.create({ description: messageText, user: sender, chat }); //krijojme mesazhin perkates per chatin e caktum
    
    
    // Save the message
    const savedMessage = await this.repo.save(message); 





   chat.messages.push(savedMessage.id); 
    await this.chatRepository.save(chat);
    


  
    return savedMessage;
  } */
  
  
  


}

