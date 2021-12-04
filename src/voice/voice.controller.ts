import {
  Controller,
  Post,
  Body,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { VoiceService } from './voice.service';
import { CreateVoiceDto } from './dto/create-voice.dto';

@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post()
  async create(
    @Response({ passthrough: true }) res,
    @Body() createVoiceDto: CreateVoiceDto,
  ): Promise<StreamableFile> {
    if (createVoiceDto.reusable) {
      const savedVoice = await this.voiceService.searchDb(res, createVoiceDto);
      if (savedVoice) return savedVoice;
    }
    return await this.voiceService.create(res, createVoiceDto);
  }
}
