import { Body, Controller, Get, HttpStatus, Param, Post, Request, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ContactEntity } from './contact.entity';
import { ContactService } from './contact.service';

@Crud({
    model: {
        type: ContactEntity,
    },
})

@Controller('contact')
export class ContactController {
    constructor(private service: ContactService) {

    }

    @Get('all')
    public async getContactsByOwnerId(@Request() req, @Response() res) {
        const ownerId = req.infoFromToken.id;
        const result = await this.service.getContactsByOwnerId(ownerId);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('add')
    public async addNewContacts(@Request() req, @Response() res, @Body() contacts) {
        const ownerId = req.infoFromToken.id;
        const result = await this.service.addNewContacts(ownerId, contacts);
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }
}
