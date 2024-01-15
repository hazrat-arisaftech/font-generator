import { Test, TestingModule } from '@nestjs/testing';
import { FontGenController } from './font-gen.controller';

describe('FontGenController', () => {
  let controller: FontGenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FontGenController],
    }).compile();

    controller = module.get<FontGenController>(FontGenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
