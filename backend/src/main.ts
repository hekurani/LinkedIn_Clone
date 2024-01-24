import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      cors: {
      origin: '*',
      credentials: true,
    },
  }
  );
  
const httpServer = app.getHttpServer();
const io = new Server(httpServer);
app.useWebSocketAdapter(new IoAdapter(io));



  await app.listen(4000);
}
bootstrap();
