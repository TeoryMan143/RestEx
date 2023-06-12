import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, PostModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
