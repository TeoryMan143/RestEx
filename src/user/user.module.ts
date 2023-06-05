import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/post.entity';

@Module({
    exports: [UserService],
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Post]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
