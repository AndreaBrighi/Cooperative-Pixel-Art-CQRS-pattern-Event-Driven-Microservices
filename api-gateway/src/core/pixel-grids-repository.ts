import { PointDto } from '../controllers/dto/PointDto';

export abstract class PixelGridsRepository {
  abstract getGridState(gridId: string): Promise<any>;

  abstract colorateGrid(
    gridId: string,
    color: string,
    point: PointDto,
  ): Promise<any>;
}
