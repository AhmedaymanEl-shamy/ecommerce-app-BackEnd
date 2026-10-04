import { Controller, Post, Body, ValidationPipe, UsePipes, BadRequestException, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, ReSendDTO, ResetPasswordDTO, SignUpDTO, VerifyAccountDTO } from './dto/auth.dto';
import { AuthGuard } from 'src/common/guards/authentication.guard';


@Controller('auth')
@UsePipes( ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')//localHost/auth/signup

 async signUp(@Body() signupDto: SignUpDTO) {

    const user = await this.authService.signUp(signupDto);
    return {
      message:'OTP sent to your email valid for 5 minutes, Check your inbox',
      success:true,
      data:{user}
    }
  }

    @Post('login')//localHost/auth/signup
  async login(@Body() loginDtTO: LoginDTO) {
   const Token  = await this.authService.login(loginDtTO);

   
     return{
      message: "login successfully",
      success:true,
      data: Token
     }
  }


  @Post('verify-account')
  async verifyAccount(@Body() verifyAccountDTO:VerifyAccountDTO){

   await this.authService.verifyAccount(verifyAccountDTO)

   return {
    message:"Email verified successfully",
    success:true
   }
  }

    @Post('re-send')
 async reSend(@Body() reSendDto: ReSendDTO) {

   await this.authService.reSendOTP(reSendDto);
    return {
      message:'OTP sent to your email valid for 5 minutes, Check your inbox',
      success:true,
      
    }
  }


  @Post('reset-password')
 async resetPassword(@Body() resetPasswordDTO:ResetPasswordDTO){

   const updatedUser =  await this.authService.resetPassword(resetPasswordDTO)

    return   {
      message:'Password updated successfully',
      success:true,
      data:{updatedUser}
    }
  }

  @Patch('log-out-from-all-devices')
  @UseGuards(AuthGuard)
  logOutFromAllDevices(@Req() req: Request){

     const userId = (req as any).user.sub;



    this.authService.logOutFromAllDevices(userId)

     return {message:"done",success:true}


  }


}
