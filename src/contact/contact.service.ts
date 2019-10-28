import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './contact.entity';

@Injectable()
export class ContactService extends TypeOrmCrudService<ContactEntity> {
    constructor(@InjectRepository(ContactEntity) repo) {
        super(repo);
    }

    async getContactsByOwnerId(ownerId) {
        return await this.repo.createQueryBuilder('contact')
            .leftJoinAndSelect('contact.contact', 'user')
            .where('contact.ownerId = :ownerId', {ownerId})
            .getMany();
    }

    async addNewContacts(ownerId, contacts) {
        return await Promise.all(
            contacts.map(async (contactId) => {
                await this.repo.save(ownerId, contactId);
            }));
    }
}
