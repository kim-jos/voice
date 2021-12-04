import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVoiceDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  model: number;

  @IsBoolean()
  @IsNotEmpty()
  reusable: boolean;
}
