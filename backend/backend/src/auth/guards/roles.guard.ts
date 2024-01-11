import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService,private configService:ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(requiredRoles);
    if (!requiredRoles || !Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token)
    if (!token) {
      console.log("Error.Line 19")
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>("JWT_SECRET")
        }
      );
      console.log(payload)
      const userRoles = payload?.role || []; //rolin e marrum na dekodimi i tokenit

      // me check nese e ka rolin qe po e kerkojme
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      console.log(hasRequiredRole)
      if (!hasRequiredRole) {
        console.log("Error:Line 31")
        throw new UnauthorizedException();
      }

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request): string {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }

}
