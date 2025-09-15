import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { CompanyService } from 'src/company/company.service';
import { RoleService } from 'src/role/role.service';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import { JWTpayload, JWTpayloadCompany } from './types/JWTpayload.type';
import { JWTpayloadRt } from './types/JWTpayloadRt.type';
import { Token, Tokens } from './types/tokens.type';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private roleService: RoleService,
    private companyService: CompanyService,
  ) {}

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.findByPassword(email, false);
    if (!user || !user?.password) {
      throw new NotFoundException('Email or password is wrong!');
    }
    const [salt, storedHash] = user?.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      return new BadRequestException('Wrong password!');
    }
    const payload_access = {
      userId: user?.id,
      roleId: user.roleId,
      email: user?.email,
      role: user?.role?.name,
    } as JWTpayload;
    const payload_refresh = { userId: user?.id } as JWTpayloadRt;
    const access_token = await this.jwtService.signAsync(payload_access);
    const refresh_token = await this.jwtService.signAsync(payload_refresh);
    const refresh_hash = await argon.hash(refresh_token);
    await this.usersService.update(user?.id, {}, refresh_hash);

    return {
      status: 'success',
      access_token,
      refresh_token,
    } as Tokens;
  }

  async companyLogin(email: string, password: string) {
    const company = await this.companyService.getCompanyByEmail(email);
    if (!company || !company?.password) {
      throw new NotFoundException('Copmpany not found');
    }
    const [salt, storedHash] = company?.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      return new BadRequestException('Wrong password!');
    }
    const role = await this.roleService.findRole('company');
    if (!role) {
      throw new InternalServerErrorException('Something went wrong');
    }

    const payload_access = {
      companyId: company?.id,
      roleId: role?.id,
      email: company?.email,
      role: role?.name,
    } as JWTpayloadCompany;

    const access_token = await this.jwtService.signAsync(payload_access);

    return {
      status: 'success',
      access_token,
    } as Token;
  }

  async findById(id) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('Email or password is wrong!');
    return user;
  }

  async googleSignUp(token: string) {
    const ticket = client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payLoad = (await ticket).getPayload();
    const users = await this.usersService.findByPassword(payLoad?.email, true);

    if (users.length && users.find((user) => !user?.password)) {
      throw new ForbiddenException('The email is used before');
    }
    const role = await this.roleService.findRole('jobseeker');
    if (!role) {
      throw new InternalServerErrorException('Something went wrong');
    }
    const user = await this.usersService.create(
      payLoad?.given_name,
      payLoad.family_name,
      payLoad?.email,
      null,
      null,
      role,
    );
    const payload_access = {
      userId: user?.id,
      roleId: user.roleId,
      email: user?.email,
      role: user?.role,
    } as JWTpayload;
    const payload_refresh = {
      userId: user?.id,
      email: user.email,
    } as JWTpayloadRt;

    const access_token = await this.jwtService.signAsync(payload_access);
    const refresh_token = await this.jwtService.signAsync(payload_refresh);
    const refresh_hash = await argon.hash(refresh_token);
    await this.usersService.update(user?.id, { RefreshToken: refresh_hash });
    return {
      status: 'success',
      access_token,
      refresh_token,
    } as Tokens;
  }

  async googleLogIn(token: string) {
    const ticket = client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payLoad = (await ticket).getPayload();
    const [user] = await this.usersService.findByPassword(payLoad?.email, true);
    if (!user) {
      throw new NotFoundException('Email or password is wrong!');
    }
    const role  = await this.roleService.findOne(user?.roleId);
    const payload_access = {
      userId: user?.id,
      roleId: user.roleId,
      email: user?.email,
      role: role?.name,
    } as JWTpayload;
    const payload_refresh = { userId: user?.id } as JWTpayloadRt;
    const access_token = await this.jwtService.signAsync(payload_access);
    const refresh_token = await this.jwtService.signAsync(payload_refresh);
    const refresh_hash = await argon.hash(refresh_token);
    await this.usersService.update(user?.id, { RefreshToken: refresh_hash });
    return {
      status: 'success',
      access_token,
      refresh_token,
    } as Tokens;
  }

  async signUp(
    name: string,
    lastname: string,
    email: string,
    password: string,
    image: string,
  ) {
    const users = await this.usersService.findByPassword(email, false);
    if (users.length) {
      throw new BadRequestException('Email is used before');
    }

    // Generate Salt
    const salt = randomBytes(8).toString('hex');
    //hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join the salt at the encoded password as the strings
    const result = salt + '.' + hash.toString('hex');
    const role = await this.roleService.findOne(1);
    if (!role) {
      throw new InternalServerErrorException('Something went wrong');
    }
    //Create the user
    const user = await this.usersService.create(
      name,
      lastname,
      email,
      result,
      image,
      role,
    );
    const payload_access = {
      userId: user?.id,
      roleId: user.roleId,
      email: user?.email,
      role: user?.role,
    } as JWTpayload;
    const payload_refresh = { userId: user?.id } as JWTpayloadRt;
    const access_token = await this.jwtService.signAsync(payload_access);
    const refresh_token = await this.jwtService.signAsync(payload_refresh);
    const refresh_hash = await argon.hash(refresh_token);
    await this.usersService.update(user?.id, {}, refresh_hash);

    console.log("access_token: ", access_token);

    return {
      status: 'success',
      access_token,
      refresh_token,
    } as Tokens;
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.usersService.findOne(userId);

    if (!user || !user.RefreshToken) {
      throw new NotFoundException('The user is not found');
    }
    const rtMatches = await argon.verify(user.RefreshToken, rt);
    if (!rtMatches) {
      throw new NotFoundException('The Refresh Token is not found');
    }
    const payload_access = { 
      userId: user?.id,
      roleId: user.roleId,
    } as JWTpayload;
    const payload_refresh = { userId: user?.id } as JWTpayloadRt;
    const access_token = await this.jwtService.signAsync(payload_access);
    const refresh_token = await this.jwtService.signAsync(payload_refresh);
    const refresh_hash = await argon.hash(refresh_token);
    await this.usersService.update(user?.id, {}, refresh_hash);

    return {
      access_token,
      refresh_token,
    };
  }

  async logout(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('No user is found');
    }
    await this.usersService.update(user?.id, {}, null);
    return;
  }
}
