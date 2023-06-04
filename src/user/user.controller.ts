import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserDto, RegisterUserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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
    editUser(@Body() user: EditUserDto, @Param('id', ParseIntPipe) id: number) {
        return this.userService.editUser(id, user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
