import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Req,
  Injectable,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpStatus,
  ParseFilePipeBuilder,
  Res,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { AuthentGuard } from './guards/auth.guard';
import { Public } from './decorators/Public-Api.decorator';
import { RtGuard } from './guards/rt.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { MailService } from '../mailer-forgot-password/mail.service';
import { extname } from 'path';
import multer, { diskStorage } from 'multer';
import { AuthUser } from './decorators/AuthUser-decorator';
import { multerOptions } from 'src/utils/multer/multerOptions.multer';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly mailService: MailService,
  ) {}
  @Post('/google/signUp')
  @Public()
  async googleSignUp(@Body() signUpDto: { token: string }) {
    return this.authService.googleSignUp(signUpDto?.token);
  }
  @Post('/google/logIn')
  @Public()
  async googleLogIn(@Body() logInDto: { token: string }) {
    return this.authService.googleLogIn(logInDto?.token);
  }

  @Post('/signUp')
  @Public()
  @UseInterceptors(
    FileInterceptor(
      'image',
      multerOptions(
        ['.jpg', '.jpeg', '.png', '.gif'], // Permissible file formats
        [{ filename: 'image', destination: '../Images/user' }], // Destination options
      ),
    ),
  )
  async signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.signUp(
      signUpDto.name,
      signUpDto.lastname,
      signUpDto.email,
      signUpDto.password,
      file?.filename,
    );
  }
  @Post('/login')
  @Public()
  logIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @UseGuards(AuthentGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return this.authService.findById(req.user.id);
  }
  @Post('/refreshtoken')
  @UseGuards(RtGuard)
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(
      req?.user?.userId,
      req?.user?.rt,
    );
  }
  @Post('/verify_OTP')
  @Public()
  verifyOTP(@Body() body: { code: string }) {
    try {
      const { code } = body;
      const result = this.mailService.verifyOTP(code);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
  @Post('/send_recovery_email')
  @Public()
  async sendRecoveryEmail(@Body() body: { email: string }) {
    const { email } = body;
    try {
      const result = await this.mailService.sendMail(email);
      return { message: result };
    } catch (error) {
      return { error: error.message };
    }
  }
  @Get('/logout')
  async logOut(@AuthUser() user: { userId: number }) {
    return this.authService.logout(user?.userId);
  }
}
