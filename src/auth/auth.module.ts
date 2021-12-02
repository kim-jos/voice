import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/user/users.repository';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRepository]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, ApiKeyStrategy, UsersService],
})
export class AuthModule {}
