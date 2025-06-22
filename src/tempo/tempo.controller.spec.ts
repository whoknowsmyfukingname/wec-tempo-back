import { Test, TestingModule } from '@nestjs/testing';
import { TempoController } from './tempo.controller';
import { TempoService } from './tempo.service';

describe('TempoController', () => {
  let controller: TempoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempoController],
      providers: [TempoService],
    }).compile();

    controller = module.get<TempoController>(TempoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
