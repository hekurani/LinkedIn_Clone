import { Body, Controller, Get, Post, UseGuards,Request,Req, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { AuthentGuard } from './guards/auth.guard';
import { Public } from './decorators/Public-Api.decorator';
import { RtGuard } from './guards/rt.guard';
import { MailService } from '../mailer-forgot-password/mail.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService,private readonly mailService: MailService){}
    @Post('/signUp')
    @Public()
   async signUp(@Body() signUpDto:SignUpDto){
      console.log("hyri")
        return await this.authService.signUp(signUpDto.email,signUpDto.password);
    }
   @Post('/login')
   @Public()
    logIn(@Body() signInDto:SignInDto){
    return this.authService.signIn(signInDto.email, signInDto.password);
   }
   @UseGuards(AuthentGuard)
   @Get('/profile')
   getProfile(@Request() req) {
     return req.user;
   }
   @Post('/send_recovery_email')
   @Public()
   async sendRecoveryEmail(@Body() body: { email: string, OTP: string }) {
    console.log("email requested")
    console.log(body)
     const { email, OTP } = body;
     try {
       const result = await this.mailService.sendMail(email, OTP);
       return { message: result };
     } catch (error) {
       return { error: error.message };
     }
   }
   @Post('/refreshtoken')
   @UseGuards(RtGuard)
  async  refreshToken(@Request() req){
return await this.authService.refreshToken(req?.user?.userId,req?.user?.rt);
   }
   @Get('/logout')
   @Public()
   async logOut(@Request() req){
    return this.authService.logout(req?.user?.userId);
   }
}
