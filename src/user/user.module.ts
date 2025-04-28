import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategies';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports:[JwtModule.register({
    secret:"lorem",global:true
  }),PassportModule],
  controllers: [UserController],
  providers: [UserService,LocalStrategy,JwtStrategy],
})
export class UserModule {}
