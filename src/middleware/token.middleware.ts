import { Injectable, NestMiddleware } from '@nestjs/common';
import * as JWT from 'jwt-decode';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        if (req.headers.authorization) {
            req.infoFromToken = JWT(req.headers.authorization.split(' ')[1]);
        }
        next();
    }
}
