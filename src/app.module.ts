import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { ContactModule } from './contact/contact.module';
import { TokenMiddleware } from './token.middleware';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'smartit2017',
        database: 'chat',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
    }), UserModule, MessageModule, ChatModule, ConfigModule, ContactModule],
    controllers: [AppController],
    providers: [AppService, ConfigService],
    exports: [ConfigModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TokenMiddleware)
            .forRoutes({path: '/', method: RequestMethod.ALL});
    }
}
