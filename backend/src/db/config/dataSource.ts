import{DataSourceOptions,DataSource} from 'typeorm'
import { SeederOptions } from 'typeorm-extension';
import { User } from '../../users/user.entity';
import { Posts } from '../../posts/post.entity';
import { Skill } from '../../skills/skills.entity';
import {ConfigModule,ConfigService} from '@nestjs/config';
import { Message } from 'src/message/message.entity';
import { ChatRoom } from 'src/chatroom/chat.entity';
import { Comment } from 'src/comments/Entity/comment.entity';
import { Friend } from 'src/friends/friends.entity';
import { FriendRequest } from 'src/friend-request/friend-request.entity';
import { Role } from 'src/role/entities/role.entity';
import { postreaction } from 'src/PostReaction/postreaction.entity';
import { commentreaction } from 'src/comment-reaction/comment-reaction.entity';
import { Reposts } from 'src/reposts/reposts.entity';
import { company } from 'src/company/company.entity';
import { city } from 'src/location/entity/city.entity';
import { country } from 'src/location/entity/country.entity';
import { Follower } from 'src/follower/follower.entity';
import { WorkExperience } from 'src/work-experience/work-experience.entity';
import { jobPost } from 'src/job-post/job-post.entity';
import { JobApplication } from 'src/job-application/job-application.entity';


 const createDataSourceOptions = (configService: ConfigService): DataSourceOptions & SeederOptions => {
    return {
        type:'postgres',
        database:configService.get('DB_NAME'),
        host:configService.get('HOST'),
        username:'postgres',
        port:configService.get('PORT'),
        password:'password',
        entities: [User,Posts,Skill,Message,ChatRoom,Comment,Friend,FriendRequest,Role,postreaction,commentreaction,Reposts,country,city,company,Follower,WorkExperience,jobPost,JobApplication],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        seeds: ['dist/db/seeds/**/*.js'],
        synchronize: false,
        logging: true
    };
  };
  
  export const dataSourceOptions = createDataSourceOptions(new ConfigService()); // Instantiate ConfigService here
  const dataSource = new DataSource(dataSourceOptions);
  
  export default dataSource;