import {
  Injectable,
  Logger,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { CreateVoiceDto } from './dto/create-voice.dto';
import { UpdateVoiceDto } from './dto/update-voice.dto';
import { Voice } from './entities/voice.entity';
import { VoiceRepository } from './voice.repository';

@Injectable()
export class VoiceService {
  private readonly logger = new Logger(VoiceService.name);

  constructor(
    @InjectRepository(Voice)
    private readonly voiceRepository: VoiceRepository,
  ) {}

  async create(res, createVoiceDto: CreateVoiceDto) {
    console.log('create ran');

    await this.sleep(1000); // create voice
    this.logger.log(createVoiceDto.text); // log voice

    const localAudioFileAddress = join(
      process.cwd(),
      `temp-files/${createVoiceDto.model}.wav`,
    );

    if (createVoiceDto.reusable) {
      await this.voiceRepository.save({
        model: createVoiceDto.model,
        text: createVoiceDto.text,
        audio: localAudioFileAddress,
      });
    }

    return this.getFile(res, localAudioFileAddress);
  }

  async searchDb(res, createVoiceDto: CreateVoiceDto) {
    console.log('search DB ran');

    const file = await this.voiceRepository.findOne({
      model: createVoiceDto.model,
    });
    if (!file) return this.create(res, createVoiceDto);

    this.logger.log(createVoiceDto.text);

    return this.getFile(res, file.audio);
  }

  private getFile(res, audioAddress): StreamableFile {
    const audioFile = createReadStream(audioAddress);
    const model = res.req.body.model;

    res.set({
      'Content-Type': 'audio/wav',
      'Content-Disposition': `attachment; filename="${model}"`,
    });
    return new StreamableFile(audioFile);
  }

  private sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async update(updateVoiceDto: UpdateVoiceDto) {
    const audio = await this.voiceRepository.findOne({
      model: updateVoiceDto.model,
    });
    if (!audio) throw new NotFoundException('Audio file does not exist');

    this.logger.log(updateVoiceDto);

    Object.assign(audio, updateVoiceDto);

    await this.voiceRepository.save(audio);

    return `Update complete`;
  }

  async delete(model: number) {
    const audio = await this.voiceRepository.findOne({ model });
    if (!audio) throw new NotFoundException('Audio file does not exist');

    await this.voiceRepository.delete(audio);

    return `Delete complete`;
  }
}
