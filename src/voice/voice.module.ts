import { Module } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { VoiceController } from './voice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voice } from './entities/voice.entity';
import { VoiceRepository } from './voice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Voice, VoiceRepository])],
  controllers: [VoiceController],
  providers: [VoiceService],
})
export class VoiceModule {}
