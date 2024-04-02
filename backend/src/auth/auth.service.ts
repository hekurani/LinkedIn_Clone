import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import {randomBytes,scrypt as _scrypt} from 'crypto'
import { promisify } from "util";
import { Tokens } from './types/tokens.type';
import { JWTpayload } from './types/JWTpayload.type';
import { JWTpayloadRt } from './types/JWTpayloadRt.type';
import * as argon from 'argon2';
import { OAuth2Client } from 'google-auth-library';
import { Response } from 'express';
const client = new OAuth2Client(
 process.env.GOOGLE_CLIENT_ID,
 process.env.GOOGLE_CLIENT_SECRET,
);
const scrypt=promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private usersService:UsersService,
       private jwtService:JwtService){}
        async signIn(email:string,password:string){
            const [user] = await this.usersService.findByPassword(email,false);
            console.log(user);
            if(!user|| !user?.password){
                throw new NotFoundException("User not found");
            }
            const [salt,storedHash]=user?.password.split('.');
            const hash=(await scrypt(password,salt,32)) as Buffer
            if(storedHash!==hash.toString('hex')){
                return new BadRequestException('Wrong password!')
            }
            const payload_access = {userId:user?.id} as JWTpayload;
            const payload_refresh={userId:user?.id} as JWTpayloadRt;
            const access_token=await this.jwtService.signAsync(payload_access);
            const refresh_token=await this.jwtService.signAsync(payload_refresh);
            const refresh_hash = await argon.hash(refresh_token);
            await this.usersService.update(user?.id, {}, refresh_hash);

            return {
                status:'success',
            access_token,
            refresh_token
          } as Tokens;
            
        
        }
        async findById(id){
const user=await this.usersService.findOne(id);
if(!user)
throw new NotFoundException("User not found");
return user;
        }
        async googleSignUp(token:string){
            const ticket= client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payLoad = (await ticket).getPayload();
            const users=await this.usersService.findByPassword(payLoad?.email,true);

            if(users.length && users.find((user)=>!user?.password)){
             throw new ForbiddenException("The email is used before");
            }
            const user=await this.usersService.create(payLoad?.given_name,payLoad.family_name,payLoad?.email,null,null);
            const payload_access = {userId:user?.id} as JWTpayload;
            const payload_refresh={userId:user?.id,email:user.email} as JWTpayloadRt;
            const access_token=await this.jwtService.signAsync(payload_access);
            const refresh_token=await this.jwtService.signAsync(payload_refresh);
            const refresh_hash = await argon.hash(refresh_token);
            await this.usersService.update(user?.id,{RefreshToken:refresh_hash})
            return {
             status:'success',
             access_token,
             refresh_token
           } as Tokens;
         }
         async googleLogIn(token:string){
             const ticket= client.verifyIdToken({
                 idToken: token,
                 audience: process.env.GOOGLE_CLIENT_ID,
             });
             const payLoad = (await ticket).getPayload();
             const [user]=await this.usersService.findByPassword(payLoad?.email,true);
             if(!user){
                throw new NotFoundException("User not found!");
             }
             const payload_access = {userId:user?.id} as JWTpayload;
             const payload_refresh={userId:user?.id} as JWTpayloadRt;
             const access_token=await this.jwtService.signAsync(payload_access);
             const refresh_token=await this.jwtService.signAsync(payload_refresh);
             const refresh_hash = await argon.hash(refresh_token);
         await this.usersService.update(user?.id,{RefreshToken:refresh_hash})
             return {
                 status:'success',
             access_token,
             refresh_token
           } as Tokens;
             
         }
        async signUp(name:string,lastname:string,email:string,password:string,image:string){
         
            
                const users=await this.usersService.findByPassword(email,false);
                if(users.length){
                throw new BadRequestException("Email is used before")
                }
              
                // Generate Salt
                const salt=randomBytes(8).toString('hex');
                //hash the salt and the password together
                const hash=(await scrypt(password,salt,32)) as Buffer;
                // join the salt at the encoded password as the strings
                const result=salt+'.'+hash.toString('hex')
                //Create the user
                const user=await this.usersService.create(name,lastname,email,result,image);
                const payload_access = {userId:user?.id} as JWTpayload;
                const payload_refresh={userId:user?.id} as JWTpayloadRt;
                const access_token=await this.jwtService.signAsync(payload_access);
                const refresh_token=await this.jwtService.signAsync(payload_refresh);
                const refresh_hash = await argon.hash(refresh_token);
                await this.usersService.update(user?.id, {}, refresh_hash);

                return {
                    status:'success',
                access_token,
                refresh_token
              } as Tokens;
               
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
         await this.usersService.update(user?.id, {}, refresh_hash);

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
            await this.usersService.update(user?.id, {},null);
            return;
        }
    
}
