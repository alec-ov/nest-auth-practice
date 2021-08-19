import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class refreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(20)
  refreshToken: string;
}
