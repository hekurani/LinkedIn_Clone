import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
import { ChatRoom } from '../chatroom/chat.entity';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private repo: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ChatRoom) private chatRepository: Repository<ChatRoom>,
  ) {}

  async sendMessage(messageText: string, userId: number, chatId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });

    if (!user || !chat) {
      throw new NotFoundException('User or chat not found');
    }
    const message = this.repo.create({ description: messageText, user, chat });
    const savedMessage = await this.repo.save(message);
    chat.messages.push(savedMessage.id);
    await this.chatRepository.save(chat);

    return this.repo.save(message);
  }

  async findAllMessages() {
    return await this.repo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    let message = await this.repo.find({
      where: { id: id },
      relations: ['user'],
    });
    return message;
  }

  async remove(id: number) {
    const message = await this.repo.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(
        'The message that you wanted to delete doesnt exist at all!',
      );
    }

    return this.repo.remove(message);
  }

  async update(id: number, attrs: Partial<Message>) {
    const message = await this.repo.findOne({ where: { id: id } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    /*  attrs.editedAt=new Date(); */

    Object.assign(message, attrs);
    return this.repo.save(message);
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
