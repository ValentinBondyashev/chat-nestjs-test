import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactEntity } from './contact.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ContactEntity])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {
}
