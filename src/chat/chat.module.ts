import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { ChatGateway } from './chat.gatway';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity])],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
})
export class ChatModule {
}
