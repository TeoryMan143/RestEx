export class CreatePostDto {
    title: string;
    body: string;
    authorId: number;
}

export class EditPostDto {
    title?: string;
    body?: string;
}
