import { Test, TestingModule } from '@nestjs/testing';
import { PixelGridController } from './app.controller';
import { PixelGridService } from './app.service';
import { PointDto } from './dto/PointDTO';

describe('AppController', () => {
  let appController: PixelGridController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PixelGridController],
      providers: [PixelGridService],
    }).compile();

    appController = app.get<PixelGridController>(PixelGridController);
  });

  describe('root', () => {
    it('should return ["Grid1"]', () => {
      expect(appController.getPixelGrids()).toStrictEqual(['Grid1']);
    });
  });

  describe('pixel-grids/:gridIds', () => {
    it('should return 0 with param Grid1', () => {
      expect(appController.getPixelGridState('Grid1')).toStrictEqual(0);
    });
  });

  describe('pixel-grids/:gridIds/color-pixel/:color', () => {
    it('should return 0 with param Grid1, 000000 and body (0,0)', () => {
      expect(
        appController.setColorForPixelInGrid(
          'Grid1',
          '000000',
          new PointDto(0, 0),
        ),
      ).toStrictEqual(0);
    });
  });
});
