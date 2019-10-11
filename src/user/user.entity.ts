import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { MessageEntity } from '../message/message.entity';
import { ChatEntity } from '../chat/chat.entity';
import { ContactEntity } from '../contact/contact.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 20})
    firstName: string;

    @Column('varchar', {length: 20})
    lastName: string;

    @Column('varchar', {length: 20})
    username: string;

    @Column('varchar', {length: 255})
    password: string;

    @Column('varchar', {length: 20})
    status: string;

    @Column('varchar', {length: 20})
    theme: string;

    @Column('varchar', {length: 20})
    language: string;

    @Column('varchar', {length: 255})
    avatar: string;

    @OneToMany(type => MessageEntity, user => user.user)
    messages: MessageEntity[];

    @ManyToMany(type => ChatEntity, chat => chat.users)
    @JoinTable()
    chats: ChatEntity[];
}
