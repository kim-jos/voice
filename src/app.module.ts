import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VoiceModule } from './voice/voice.module';

@Module({
  imports: [UserModule, VoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
