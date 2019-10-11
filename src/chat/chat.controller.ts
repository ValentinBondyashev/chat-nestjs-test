import { Controller } from '@nestjs/common';
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
}
