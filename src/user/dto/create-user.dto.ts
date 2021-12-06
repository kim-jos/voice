import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'password must be at least 3 characters',
    context: {
      errorCode: 1003,
      developerNote: 'The validated string must contain 3 or more characters.',
    },
  })
  @ApiProperty()
  password: string;
}
