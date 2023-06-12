import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { CreatePostDto, EditPostDto } from './post.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class PostService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}

    async createPost(post: CreatePostDto) {
        const userFound = await this.userService.getUser(post.authorId);

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else if (!post.title || !post.body) {
            return new HttpException(
                'Insert required data',
                HttpStatus.BAD_REQUEST
            );
        } else if (!post.authorId) {
            return new HttpException(
                'Insert an author',
                HttpStatus.BAD_REQUEST
            );
        }

        return this.postRepository.save(post);
    }

    getAllPosts() {
        return this.postRepository.find();
    }

    async getPost(id: number) {
        const postFound = await this.postRepository.findOne({
            where: { id },
        });

        if (!postFound) {
            return new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

        return postFound;
    }

    async editPost(id: number, post: EditPostDto) {
        const postFound = await this.postRepository.findOne({
            where: { id },
        });

        if (!postFound) {
            return new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

        return this.postRepository.update(id, post);
    }

    async deletePost(id: number) {
        const userFound = await this.postRepository.findOne({
            where: { id },
        });

        if (!userFound) {
            return new HttpException(
                'User does not exist',
                HttpStatus.NOT_FOUND
            );
        }

        return this.postRepository.delete(id);
    }

    async fakePosts(count: number) {
        const fakes: CreatePostDto[] = [];
        for (let i = 0; i < count; i++) {
            const authorId = faker.number.int({ max: 26 });
            const userFound: User | HttpException =
                await this.userService.getUser(authorId);

            if (userFound instanceof HttpException) {
                continue;
            }

            fakes.push({
                title: faker.lorem.words(),
                body: faker.lorem.paragraphs(),
                authorId,
            });
        }

        return this.postRepository.save(fakes);
    }
}
