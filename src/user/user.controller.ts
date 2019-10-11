import { Body, Controller, Get, HttpStatus, Post, Request, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Crud({
    model: {
        type: UserEntity,
    },
})

@Controller('user')
export class UserController {
    constructor(public service: UserService) {
    }

    @Post('register')
    public async register(@Response() res, @Body() user) {
        const result = await this.service.registration(user);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('login')
    public async login(@Response() res, @Body() user) {
        const result = await this.service.login(user);
        if (result.error) {
            return res.status(HttpStatus.BAD_REQUEST).json(result.error);
        }
        return res.status(HttpStatus.OK).json(result);
    }
}
