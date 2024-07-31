import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('follower')
export class FollowerController {

    constructor(){}
    @Post()
    sendFollow(){}

    @Get()
    getFollowers(){}

    @Delete()
    unFollow(){}
}
