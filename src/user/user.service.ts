import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { EditUserDto, RegisterUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        if (!userFound) {
            return new HttpException(
                'User does not exist',
                HttpStatus.NOT_FOUND
            );
        }

        return userFound;
    }

    getAllUsers() {
        return this.userRepository.find();
    }

    async registerUser(user: RegisterUserDto) {
        const userNameFound = await this.userRepository.findOne({
            where: {
                username: user.username,
            },
        });
        const emailFound = await this.userRepository.findOne({
            where: {
                email: user.email,
            },
        });

        if (userNameFound) {
            return new HttpException('User already exist', HttpStatus.CONFLICT);
        } else if (emailFound) {
            return new HttpException(
                'Email already exist',
                HttpStatus.CONFLICT
            );
        } else if (!user.password || !user.username) {
            return new HttpException(
                'Insert required data',
                HttpStatus.BAD_REQUEST
            );
        }
        return this.userRepository.save(user);
    }

    async editUser(id: number, user: EditUserDto) {
        const userNameFound = await this.userRepository.findOne({
            where: {
                username: user.username,
            },
        });
        const emailFound = await this.userRepository.findOne({
            where: {
                email: user.email,
            },
        });

        if (!userNameFound) {
            return new HttpException(
                'User does not exist',
                HttpStatus.NOT_FOUND
            );
        } else if (emailFound) {
            return new HttpException(
                'Email already exist',
                HttpStatus.CONFLICT
            );
        }

        return this.userRepository.update(id, user);
    }

    async deleteUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        if (!userFound) {
            return new HttpException(
                'User does not exist',
                HttpStatus.NOT_FOUND
            );
        }

        return this.userRepository.delete(id);
    }

    getUsersWithPosts() {
        return this.userRepository
            .createQueryBuilder('user')
            .innerJoin('post', 'post', 'user.id = post.authorId')
            .getMany();
    }
}
