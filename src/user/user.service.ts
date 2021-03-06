import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    private readonly salt;

    constructor(config: ConfigService, @InjectRepository(UserEntity) repo) {
        super(repo);
        this.salt = config.get('SALT');
    }

    async registration(user) {
        const hash: string = await bcrypt.hash(user.password, Number(this.salt));
        const newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: hash,
            status: user.status,
            theme: user.theme,
            language: user.language,
            avatar: user.avatar,
        };
        const createdUser = await this.repo.save(newUser);
        const token: string = jwt.sign({
            username: createdUser.username,
            theme: createdUser.theme,
            language: createdUser.language,
            id: createdUser.id,
        }, this.salt, {expiresIn: '100h'});
        return {token, message: 'Registration successful'};
    }

    async login(user) {
        const availableUser = await this.repo.findOne({username: user.username});
        if (!availableUser) {
            return {error: 'There is no such user in the system'};
        }
        const checkUser: boolean = await bcrypt.compare(user.password, availableUser.password);
        if (!checkUser) {
            return {error: 'Password is incorrect please try again'};
        }
        const token: string = jwt.sign({
            firstName: availableUser.firstName,
            lastName: availableUser.lastName,
            username: availableUser.username,
            theme: availableUser.theme,
            language: availableUser.language,
            id: availableUser.id,
        }, this.salt, {expiresIn: '100h'});
        return {token, message: 'Login successful'};
    }

    async getUsersWithFilter(filter) {
        return await this.repo.createQueryBuilder('user')
            .where('user.firstName like :filter', {filter: '%' + filter + '%'})
            .getMany();
    }

}
