import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ChatEntity } from './chat.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ChatService extends TypeOrmCrudService<ChatEntity> {
    constructor(@InjectRepository(ChatEntity)
                    repo,
                @Inject('USER_REPOSITORY')
                private readonly userRepo: Repository<UserEntity>,
    ) {
        super(repo);
    }

    async getAllChats(ownerId) {
        return await this.repo
            .createQueryBuilder('chat')
            .innerJoin('chat.users', 'user', 'user.id = :ownerId', {ownerId})
            .getMany();
    }

    async addNewChat(ownerId, name, users) {
        const ids = [];
        users.forEach(user => {
            ids.push(user.id);
        });
        const us = await this.userRepo
            .createQueryBuilder('user')
            .where('user.id IN (:...ids)', {ids: [...ids, ownerId]})
            .getMany();

        return await this.repo.save({ownerId, name, users: us});
    }
}
