import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {
	}


	@Post('/signup')
	signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.authService.signUp(authCredentialsDto);
	}

	@Post('/signin')
	signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
		return this.authService.signIn(authCredentialsDto);
	}

	// This was a test to validate my decorator with auth
	// @Post('/test')
	// @UseGuards(AuthGuard())
	// test(@GetUser() user: User) {
	// 	console.log(user);
	// }
}
