import {
  Controller,
  Post,
  Body,
  Response,
  StreamableFile,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { VoiceService } from './voice.service';
import { CreateVoiceDto } from './dto/create-voice.dto';
import { UpdateVoiceDto } from './dto/update-voice.dto';

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

  @Patch()
  async update(@Body() updateVoiceDto: UpdateVoiceDto) {
    return this.voiceService.update(updateVoiceDto);
  }

  @Delete('/:id')
  async delete(@Param() id: number) {
    return this.voiceService.delete(id);
  }
}
