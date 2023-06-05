import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, EditPostDto } from './post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getPost(id);
    }

    @Post()
    createPost(@Body() post: CreatePostDto) {
        return this.postService.createPost(post);
    }

    @Patch(':id')
    editPost(@Param('id', ParseIntPipe) id: number, @Body() post: EditPostDto) {
        return this.postService.editPost(id, post);
    }

    @Delete(':id')
    deletePost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.deletePost(id);
    }

    @Put(':count')
    fakePosts(@Param('count', ParseIntPipe) count: number) {
        return this.postService.fakePosts(count);
    }
}
