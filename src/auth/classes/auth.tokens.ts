import { ApiProperty } from '@nestjs/swagger';

export class AuthTokens {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
