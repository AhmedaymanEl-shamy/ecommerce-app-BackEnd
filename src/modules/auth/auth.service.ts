import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, ReSendDTO, ResetPasswordDTO, SignUpDTO, VerifyAccountDTO } from './dto/auth.dto';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { JwtService } from '@nestjs/jwt';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MailService } from 'src/common/mail/mail.service';
import { OTPService } from 'src/common/utils/otp.utils';
import { HashService } from 'src/common/utils/bcrypt.utils';
import { EncryptionService } from 'src/common/utils/crypto.utils';
import { Types } from 'mongoose';


@Injectable()
export class AuthService {

  constructor(private readonly customerRepo: CustomerRepository,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)private readonly cacheManager:Cache,
    private readonly mailService: MailService,
    private readonly otpService:OTPService,
    private readonly hashService:HashService,
    private readonly encryptionService: EncryptionService
  ){}

  async signUp(signUpDto: SignUpDTO) {
    // check email exist
   const userExist = await this.customerRepo.getOne({email:signUpDto.email})

   if(userExist) throw new ConflictException("Email already exist")

   const cachedUser =  await this.cacheManager.get(signUpDto.email)

   if(cachedUser) throw new BadRequestException("Email already signed in go verify your account, check you inbox for OTP")

    const OTP = this.otpService.generateOTp()

    //prepare data
   signUpDto.password = await this.hashService.hash(signUpDto.password)
   signUpDto.phoneNumber = this.encryptionService.encrypt(signUpDto.phoneNumber)


    // send otp 
   await this.mailService.sendEmail(signUpDto.email,"Confirm Email",`<p>your OTP: ${OTP}</p>`)
   await this.cacheManager.set(`${signUpDto.email}:OTP`,OTP,5*60*1000)
    // store in cache
    return await this.cacheManager.set(signUpDto.email,signUpDto,60*60*1000)
    // await this.customerRepo.create(signUpDto)
  }


 async login(loginDto: LoginDTO){

  // check email exist
  const userExist =  await this.customerRepo.getOne({email:loginDto.email,role:'Customer'})

  if(!userExist) throw new NotFoundException("Invalid email or password")

         if (userExist.lockUntil && userExist.lockUntil.getTime() > Date.now()) {

     throw new BadRequestException("too many attempts, try after 5 minutes")
}

if (userExist.lockUntil && userExist.lockUntil.getTime() <= Date.now()) {
  userExist.numberOfTries = 0;
  userExist.lockUntil = null;
  await userExist.save();
}

 
    const passwordMatch = await this.hashService.compare(loginDto.password,userExist.password)

    if(!passwordMatch) {

       userExist.numberOfTries = ( userExist.numberOfTries as number) + 1 
    if(userExist.numberOfTries as number >= 5){
       userExist.lockUntil = new Date(Date.now() + 5 * 60 * 1000)
       userExist.save()
      throw new BadRequestException("too many attempts, try after 5 minutes")
    }
     await userExist.save();
    throw new NotFoundException("Invalid email or password")
    }

  const accessToken =   this.jwtService.sign({sub:userExist._id,role:userExist['role']})
  const refreshToken =  this.jwtService.sign({sub:userExist._id,role:userExist['role']},{expiresIn:'7d'})


  return {accessToken,refreshToken}

  }
  
  async verifyAccount(verifyAccountDTO:VerifyAccountDTO){

  const cachedUser =  await this.cacheManager.get(verifyAccountDTO.email)

  if(!cachedUser) throw new NotFoundException('email not found go signUp')

    const cachedOTP = await this.cacheManager.get(`${verifyAccountDTO.email}:OTP`)

    if(!cachedOTP || verifyAccountDTO.OTP != cachedOTP) throw new ConflictException("Invalid OTP")

      await this.customerRepo.create(cachedUser)

      this.cacheManager.del(verifyAccountDTO.email)
      this.cacheManager.del(`${verifyAccountDTO.email}:OTP`)
  }

  async reSendOTP(reSendOTP:ReSendDTO){

  const cachedUser = await this.cacheManager.get(reSendOTP.email)

    if(!cachedUser) throw new NotFoundException('email not found go signUp')

    const cachedOTP = await this.cacheManager.get(`${reSendOTP.email}:OTP`)

    if(cachedOTP) throw new UnauthorizedException("Your OTP still Valid")

       const OTP = this.otpService.generateOTp()

       await this.mailService.sendEmail(reSendOTP.email,"Confirm Email",`<p>your OTP: ${OTP}</p>`)

      await this.cacheManager.set(`${reSendOTP.email}:OTP`,OTP,5*60*1000)

      return true

  }

  async resetPassword(resetPasswordDTO:ResetPasswordDTO){

    const userExist =  await this.customerRepo.getOne({email:resetPasswordDTO.email,role:'Customer'})

   if(!userExist) throw new NotFoundException("Email not found")

   resetPasswordDTO.newPassword = await this.hashService.hash(resetPasswordDTO.newPassword)

   const updatedUser = await this.customerRepo.update({email:resetPasswordDTO.email,role:'Customer'},{password:resetPasswordDTO.newPassword})

   return updatedUser


  }


   async logOutFromAllDevices(userId:Types.ObjectId){

       return await this.customerRepo.update({_id:userId},{credentialsUpdatedAt: Date.now() })

    }




}
