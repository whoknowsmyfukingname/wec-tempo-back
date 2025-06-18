import { Controller, Get, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {

    constructor (private readonly sessionsService: SessionsService) { }

    @Get('years')
    getYears() {
        return this.sessionsService.getAllYears();
    }

    @Get(':year')
    getPlacesByYear(@Param('year') year: number) {
        return this.sessionsService.getPlacesByYear(year);
    }

    @Get(':year/:place')
    getSessionsByYearAndPlace(@Param('year') year: number, @Param('place') place: string) {
        return this.sessionsService.getSessionsByYearAndPlace(year, place);
    }

    @Get(':year/:place/:session')
    getCategoriesInSession(
        @Param('year') year: number,
        @Param('place') place: string,
        @Param('session') session: string
    ) {
        return this.sessionsService.getCategoriesInSession(year, place, session);
    }

}