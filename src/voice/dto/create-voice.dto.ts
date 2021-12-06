import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateVoiceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  model: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  reusable: boolean;
}
