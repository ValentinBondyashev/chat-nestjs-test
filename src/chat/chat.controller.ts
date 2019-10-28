import { Controller, Get, HttpStatus, Post, Request, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ChatEntity } from './chat.entity';
import { ChatService } from './chat.service';

@Crud({
    model: {
        type: ChatEntity,
    },
})
@Controller('chat')
export class ChatController {
    constructor(public service: ChatService) {
    }

    @Post('/')
    public async addNewChat(@Request() req, @Response() res) {
        const {name, users} = req.body;
        const ownerId = req.infoFromToken.id;
        const result = await this.service.addNewChat(ownerId, name, users);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Get('/all')
    public async getAllChat(@Request() req, @Response() res) {
        const ownerId = req.infoFromToken.id;
        const result = await this.service.getAllChats(ownerId);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }
}
