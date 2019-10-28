import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { MessageEntity } from '../message/message.entity';
import { UserEntity } from '../user/user.entity';

@Entity('chat')
export class ChatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 20})
    name: string;

    @Column()
    ownerId: number;

    @OneToMany(type => MessageEntity, message => message.chat)
    messages: MessageEntity[];

    @ManyToMany(type => UserEntity, user => user.chats)
    users: UserEntity[];

}
