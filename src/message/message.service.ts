import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService extends TypeOrmCrudService<MessageEntity> {
    constructor(@InjectRepository(MessageEntity) repo) {
        super(repo);
    }

    async saveMessage(message, chatId, userId) {
        const result = await this.repo.create({
            text: message.text,
            status: 'read', chat: chatId, user: userId,
        });
        return await this.repo.save(result);
    }

    async getMessageFromChat(chatId) {
        return await this.repo.find({where: {chat: chatId}, relations: ['user']});
    }
}
