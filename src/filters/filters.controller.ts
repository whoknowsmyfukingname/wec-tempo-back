import { Body, Controller, Get, Post } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { GetSessionsOrCategoriesByEventDto, GetEventsByYear, GetParticipantsByCategoryDto } from './filters.dto';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) { }

  @Get('years')
  getAllYears() {
    return this.filtersService.getAllYears();
  }

  @Post('events')
  getEventsByYear(@Body() getEventsByYear: GetEventsByYear) {
    const { year } = getEventsByYear;
    return this.filtersService.getEventsByYear(year);
  }

  @Post('sessions')
  getSessionsByEvent(@Body() getSessionsByEventDto: GetSessionsOrCategoriesByEventDto) {
    const { year, eventId } = getSessionsByEventDto;
    return this.filtersService.getSessionsByEvent(year, eventId);
  }

  @Post('categories')
  getCategoriesByEvent(@Body() getCategoiresByEventDto: GetSessionsOrCategoriesByEventDto) {
    const { year, eventId } = getCategoiresByEventDto;
    return this.filtersService.getCategoriesByEvent(year, eventId);
  }

  @Post('participants')
  getParticipantsByCategory(@Body() getParticipantsByCategoryDto: GetParticipantsByCategoryDto) {
    const { year, eventId, category } = getParticipantsByCategoryDto;
    return this.filtersService.getParticipantsByCategory(year, eventId, category);
  }
}
