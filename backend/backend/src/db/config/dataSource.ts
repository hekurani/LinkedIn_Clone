import{DataSourceOptions,DataSource} from 'typeorm'
import { SeederOptions } from 'typeorm-extension';
import { User } from '../../users/user.entity';
import { Posts } from '../../posts/post.entity';
import { Skill } from '../../skills/skills.entity';
import {ConfigModule,ConfigService} from '@nestjs/config';
 const createDataSourceOptions = (configService: ConfigService): DataSourceOptions & SeederOptions => {
    return {
        type:'postgres',
        database:configService.get('DB_NAME'),
        host:configService.get('HOST'),
        username:'postgres',
        port:+configService.get('PORT'),
        password:'1234',
        entities: ['dist/resources/**/*.entity.js'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        seeds: ['dist/db/seeds/**/*.js'],
        synchronize: false,
        logging: true
    };
  };
  
  export const dataSourceOptions = createDataSourceOptions(new ConfigService()); // Instantiate ConfigService here
  const dataSource = new DataSource(dataSourceOptions);
  
  export default dataSource;