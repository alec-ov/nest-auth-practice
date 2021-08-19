import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export default class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 20)
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 30)
  password: string;
}
