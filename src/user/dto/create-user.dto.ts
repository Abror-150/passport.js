import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: Role;
}
