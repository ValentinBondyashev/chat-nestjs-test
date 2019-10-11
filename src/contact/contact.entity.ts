import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('contact')
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ownerId: number;

    @OneToOne(type => UserEntity, contact => contact.id)
    @JoinColumn()
    contact: UserEntity;
}
