import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserLoginDto } from './dto/create-user.dtoLogin.copy';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: CreateUserLoginDto })
  login(@Req() req: Request) {
    return this.userService.login(req.user);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
