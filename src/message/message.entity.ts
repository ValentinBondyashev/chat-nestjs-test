import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ChatEntity } from '../chat/chat.entity';

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 100})
    text: string;

    @Column('varchar', {length: 20})
    lastName: string;

    @Column('varchar', {length: 20})
    status: string;

    @ManyToOne(type => UserEntity, user => user.messages)
    user: UserEntity[];

    @ManyToOne(type => ChatEntity, chat => chat.messages)
    chat: UserEntity[];
}
