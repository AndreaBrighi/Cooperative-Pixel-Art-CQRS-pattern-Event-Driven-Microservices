export abstract class PixelGridsRepository {
  abstract getGridState(gridId: string): Promise<any>;

  abstract colorateGrid(gridId: string): Promise<any>;
}
