import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        
    }


    // signup(@Body('email') email: String, @Body('password', ParseIntPipe) password: String) {
    //     console.log({
    //         email,
    //         typeOfEmail: typeof email,
    //         password,
    //         typeOfPassword: typeof password,
    //     });
    // signup/user/1
    // @HttpCode(HttpStatus.OK) code 200
    @Post('signup') // auth/signup
    signup(@Body() dto: AuthDto) {
        console.log({
            dto,
        })
        return this.authService.signup(dto)
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {

        return this.authService.signin(dto)    
    }
}
