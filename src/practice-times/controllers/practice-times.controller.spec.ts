import { Test, TestingModule } from '@nestjs/testing';
import { PracticeTimesController } from './practice-times.controller';

describe('PracticeTimes Controller', () => {
  let controller: PracticeTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeTimesController],
    }).compile();

    controller = module.get<PracticeTimesController>(PracticeTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
