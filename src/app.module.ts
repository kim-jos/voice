import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { VoiceModule } from './voice/voice.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UsersRepository } from './user/users.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Apap1879!@',
      database: 'test',
      entities: [User, UsersRepository],
      synchronize: true,
    }),
    UsersModule,
    VoiceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
