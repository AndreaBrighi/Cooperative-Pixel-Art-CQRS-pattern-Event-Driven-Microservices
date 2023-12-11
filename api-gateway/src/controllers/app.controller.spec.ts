import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './app.controller';
import { PointDto } from './dto/PointDto';
import { PixelGridsUseCases } from 'src/usecases/pixel-grids.usecases';

describe('AppController', () => {
  let appController: GatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [PixelGridsUseCases],
    }).compile();

    appController = app.get<GatewayController>(GatewayController);
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
