import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@nestjs/microservices";


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
          urls: ['amqp://guest:guest@localhost:5672/info'],
          queue: 'logs_queue',
          queueOptions: {
              durable: false
        }
      }
  });

  await app.listen().then(res => {
    console.log(res, "listening")
  })
}

bootstrap()
