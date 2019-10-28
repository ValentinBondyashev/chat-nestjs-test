import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import * as JWT from 'jwt-decode';
import { MessageService } from '../message/message.service';
import { Observable } from 'rxjs/internal/Observable';

@WebSocketGateway()
export class ChatGateway {
    constructor(private readonly messageService: MessageService) {

    }

    @WebSocketServer() server;
    users: number = 0;
    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('message')
    async onChat(client, data) {
        let info;
        if (client.handshake.query.token) {
            info = JWT(client.handshake.query.token);
        }
        this.logger.log(`user sent message to ${data.room} chat`);
        await this.messageService.saveMessage(data.message, data.room, info.id);
        client.broadcast.to(data.room).emit('message', [{...data.message, user: info}]);
        return new Observable((observer) => {
            observer.next({event: 'message', data: [{...data.message, user: info}]});
        });
    }

    @SubscribeMessage('join')
    async onRoomJoin(client, room) {
        client.join(room);
        this.logger.log(`user join to ${room} room`);
        const messages = await this.messageService.getMessageFromChat(room);
        client.emit('message', messages || []);
    }

    @SubscribeMessage('leave')
    onRoomLeave(client, data: any): void {
        client.leave(data);
        this.logger.log(`user left to ${data} room`);
    }

}