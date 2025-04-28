import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserLoginDto {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
}
