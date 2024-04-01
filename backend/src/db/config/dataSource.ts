import{DataSourceOptions,DataSource} from 'typeorm'
import { SeederOptions } from 'typeorm-extension';
import { User } from '../../users/user.entity';
import { Posts } from '../../posts/post.entity';
import { Skill } from '../../skills/skills.entity';
import {ConfigModule,ConfigService} from '@nestjs/config';
import { Message } from 'src/message/Entity/message.entity';
import { ChatRoom } from 'src/chatroom/chat.entity';
import { Comment } from 'src/comments/Entity/comment.entity';
import { Friend } from 'src/friends/friends.entity';
import { FriendRequest } from 'src/friend-request/friend-request.entity';
import { EditedComment } from 'src/comments/Entity/editedcomment.entity';
import { DeletedMessage } from 'src/message/Entity/deletedmessage.entity';
import { EditedMessage } from 'src/message/Entity/editedmessage.entity';
 const createDataSourceOptions = (configService: ConfigService): DataSourceOptions & SeederOptions => {
    return {
        type:'postgres',
        database:configService.get('DB_NAME'),
        host:configService.get('HOST'),
        username:'postgres',
        port:configService.get('PORT'),
        password:'password',
        entities: [User,Posts,Skill,Message,ChatRoom,Comment,Friend,FriendRequest,EditedComment,DeletedMessage,EditedMessage],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        seeds: ['dist/db/seeds/**/*.js'],
        synchronize: false,
        logging: true
    };
  };
  
  export const dataSourceOptions = createDataSourceOptions(new ConfigService()); // Instantiate ConfigService here
  const dataSource = new DataSource(dataSourceOptions);
  
  export default dataSource;