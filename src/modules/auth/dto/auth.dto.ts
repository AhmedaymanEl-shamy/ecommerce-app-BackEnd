import { IsString, IsInt,IsEmail, IsNotEmpty, MaxLength, MinLength, IsStrongPassword, IsPhoneNumber, Length } from 'class-validator';
import { IsName } from 'src/common/dto/dto.validation';

export class SignUpDTO  {

    @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    @IsNotEmpty({message:'Email is required'})
    email:string

    @IsName(2,20)
    userName:string

    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword({minLength:8,minSymbols:1},{ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol' })
    password:string

    @IsPhoneNumber('EG')
    phoneNumber:string

}

export class LoginDTO  {
     @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    @IsNotEmpty({message:'Email is required'})
    email:string
    
    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword({minLength:8,minSymbols:1},{ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol' })
    password:string

}


export class VerifyAccountDTO  {
      @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    @IsNotEmpty({message:'Email is required'})
    email:string

    @IsNotEmpty({message:'OTP is required'})
    @Length(6,6,{message:'OTP must be 6 numbers only'})
    OTP:string
}

export class ReSendDTO  {
    @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    email:string
    
}

export class ResetPasswordDTO  {
    @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    @IsNotEmpty({message:'Email is required'})
    email:string
    
    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword({minLength:8,minSymbols:1},{ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol' })
    newPassword:string

}