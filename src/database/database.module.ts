import { Module } from '@nestjs/common';
import { databaseProviders } from './database';

@Module({
    exports: [...databaseProviders],
    providers: [...databaseProviders],
})
export class DatabaseModule {
}
