import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';

@Crud({
    model: {
        type: MessageEntity,
    },
})

@Controller('message')
export class MessageController {
    constructor(private service: MessageService) {

    }
}
