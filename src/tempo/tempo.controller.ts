import { Body, Controller, Post } from '@nestjs/common';
import { TempoService } from './tempo.service';
import { GetSessionTempoDto } from './dtos/getSessionTempo.dto';

@Controller('tempo')
export class TempoController {
  constructor(private readonly tempoService: TempoService) {}

  @Post('data')
  getSessionTempo(@Body() getSessionTempoDto: GetSessionTempoDto) {
    const { eventId, session, participant } = getSessionTempoDto;
    return this.tempoService.getSessionTempo(eventId, session, participant);
  }
}
