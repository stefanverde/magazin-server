import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    console.log(authLoginDto);
    return this.authService.login(authLoginDto);
  }

  // @Post("email/register")
  // @HttpCode(HttpStatus.OK)
  // async register (@Body() createUserDto:CreateUserDto):Promise<Response>{
  //   try{
  //     const newUser = new UserDto( await this.usersService.createNewUser(createUserDto))
  //   }
  //   await this.authService.createEmailtOKEN(newUser.email);
  //   const sent = await this.authService.sendEmailVerification(newUser.email);
  //   if(sent){
  //     return new ResponseSuccess("Registration Successfully");
  //   }
  //   else{
  //     return new ResponseError("Mail not sent");
  //   }

  // } catch(error){
  //   return new ResponseError("Generic Error:", error);
  // }
}
