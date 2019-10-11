import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService extends TypeOrmCrudService<MessageEntity> {
    constructor(@InjectRepository(MessageEntity) repo) {
        super(repo);
    }
}
