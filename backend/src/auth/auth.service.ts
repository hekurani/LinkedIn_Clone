import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import {randomBytes,scrypt as _scrypt} from 'crypto'
import { promisify } from "util";
import { Tokens } from './types/tokens.type';
import { JWTpayload } from './types/JWTpayload.type';
import { JWTpayloadRt } from './types/JWTpayloadRt.type';
import * as argon from 'argon2';
const scrypt=promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private usersService:UsersService,
       private jwtService:JwtService){}
    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);

        if (!user) {
            throw new NotFoundException("Email does not exist!");
        }

        const isPasswordValid = await argon.verify(user.password, password);

        if (!isPasswordValid) {
            throw new BadRequestException('Wrong password!');
        }

        const payloadAccess = { userId: user?.id } as JWTpayload;
        const payloadRefresh = { userId: user?.id } as JWTpayloadRt;

        const accessToken = await this.jwtService.signAsync(payloadAccess);
        const refreshToken = await this.jwtService.signAsync(payloadRefresh);

        await this.usersService.update(user?.id, { RefreshToken: refreshToken });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        } as Tokens;
    }

        async signUp(email:string,password:string){
            try{
                const users=await this.usersService.find(email);
                if(users.length){
                throw new BadRequestException("Email is already used")
                }
                // Generate Salt
                const salt=randomBytes(8).toString('hex');
                //hash the salt and the password together
                const hash=(await scrypt(password,salt,32)) as Buffer;
                // join the salt at the encoded password as the strings
                const result=salt+'.'+hash.toString('hex')
                //Create the user
                const user=await this.usersService.create(email,result);
                console.log(user);
                const payload_access = {userId:user?.id} as JWTpayload;
                const payload_refresh={userId:user?.id} as JWTpayloadRt;
                const access_token=await this.jwtService.signAsync(payload_access);
                const refresh_token=await this.jwtService.signAsync(payload_refresh);
                const refresh_hash = await argon.hash(refresh_token);
            await this.usersService.update(user?.id,{RefreshToken:refresh_hash})
                return {
                access_token,
                refresh_token
              } as Tokens;
            }
            catch(err){
                console.log("err",err);
            }
               
        }
        async refreshToken(userId:number,rt:string){
         const user=await this.usersService.findOne(userId);
         if(!user || !user.RefreshToken){
            throw new NotFoundException("The user is not found");
         }
const rtMatches= await argon.verify(user.RefreshToken, rt);
         if(!rtMatches){
            throw new NotFoundException("The Refresh Token is not found")
         }
         const payload_access = {userId:user?.id} as JWTpayload;
         const payload_refresh={userId:user?.id} as JWTpayloadRt;
         const access_token=await this.jwtService.signAsync(payload_access);
         const refresh_token=await this.jwtService.signAsync(payload_refresh);
         const refresh_hash = await argon.hash(refresh_token);
     await this.usersService.update(user?.id,{RefreshToken:refresh_hash})
return {
    access_token,
    refresh_token
}
        }
       async logout(userId:number){
            const user=await this.usersService.findOne(userId);
            if(!user){
                throw new NotFoundException("No user is found")
            }
            await this.usersService.update(user?.id,{RefreshToken:null});
            return;
        }
    
}
