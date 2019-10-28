import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { ChatGateway } from './chat.gatway';
import { ConfigModule } from '../config/config.module';
import { userProviders } from '../user/user.provider';
import { databaseProviders } from '../database/database';
import { MessageModule } from '../message/message.module';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity]), ConfigModule, MessageModule],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway, ...userProviders, ...databaseProviders],
})
export class ChatModule {
}
