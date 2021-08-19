import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export default class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 20)
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 30)
  password: string;
}
