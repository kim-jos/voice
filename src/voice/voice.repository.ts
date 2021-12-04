import { EntityRepository, Repository } from 'typeorm';
import { Voice } from './entities/voice.entity';

@EntityRepository(Voice)
export class VoiceRepository extends Repository<Voice> {}
