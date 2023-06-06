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
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserDto, RegisterUserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('hasPublished')
    hasPublished() {
        return this.userService.getUsersWithPosts();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post()
    createUser(@Body() user: RegisterUserDto) {
        return this.userService.registerUser(user);
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    editUser(@Body() user: EditUserDto, @Param('id', ParseIntPipe) id: number) {
        return this.userService.editUser(id, user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }

    @Put('gen/:count')
    fakeUsers(@Param('count', ParseIntPipe) count: number) {
        return this.userService.fakeUsers(count);
    }
}
