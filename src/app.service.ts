import { Injectable } from '@nestjs/common';

const how = {
    message: 'How did you get here',
};

@Injectable()
export class AppService {
    getHello() {
        return how;
    }
}
