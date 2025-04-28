import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    try {
      let user = await this.prisma.user.findFirst({
        where: { userName: data.userName },
      });
      if (user) {
        throw new BadRequestException('user already exits');
      }
      let hash = bcrypt.hashSync(data.password, 10);
      let newUser = await this.prisma.user.create({
        data: { userName: data.userName, password: hash, role: data.role },
      });
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async validate(userName: string, password: string) {
    try {
      let user = await this.prisma.user.findFirst({ where: { userName } });
      if (!user) {
        throw new NotFoundException('user not found');
      }

      let match = bcrypt.compareSync(password, user.password);
      if (!match) {
        throw new BadRequestException('wrong password');
      }
      return user;
    } catch (error) {
      return error;
    }
  }
  async login(user: any) {
    try {
      let token = this.jwt.sign({ id: user.id, role: user.role });
      return { token };
    } catch (error) {
      return error;
    }
  }
  async getUsers() {
    try {
      let users = await this.prisma.user.findMany();

      return users;
    } catch (error) {
      return error;
    }
  }
}
