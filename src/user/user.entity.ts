import { Post } from '../post/post.entity';
import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Column({ unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true })
    authStrat: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
}
