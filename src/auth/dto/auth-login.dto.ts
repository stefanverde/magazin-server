import { IsEmail, IsNotEmpty, isEmail } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  
}


