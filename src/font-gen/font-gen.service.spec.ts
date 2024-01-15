import { Test, TestingModule } from '@nestjs/testing';
import { FontGenService } from './font-gen.service';

describe('FontGenService', () => {
  let service: FontGenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FontGenService],
    }).compile();

    service = module.get<FontGenService>(FontGenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
