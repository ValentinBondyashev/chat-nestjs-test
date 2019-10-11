import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ChatEntity } from './chat.entity';

@Injectable()
export class ChatService extends TypeOrmCrudService<ChatEntity> {
    constructor(@InjectRepository(ChatEntity) repo) {
        super(repo);
    }
}
