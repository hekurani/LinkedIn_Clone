import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/Public-Api.decorator';
import { JWTpayloadRt } from '../types/JWTpayloadRt.type';
// njejt si auth.guard veq ktu te req.user e kam shti edhe refreshtokenin qe me perdor me req.user.rt me von edhe me manipulu
  @Injectable()
export class RtGuard implements CanActivate {
  constructor(private jwtService: JwtService,private configService:ConfigService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
  
    if (!token) {  
      throw new UnauthorizedException();
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>("JWT_SECRET")
        }
      );
      request['user'] = {...payload,rt:token} as JWTpayloadRt;
    } catch(er) {
      throw new UnauthorizedException();
      
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log("type "+type,"token "+token)
    return type === 'Bearer' ? token : undefined;
  }
}