export abstract class PixelGridsRepository {
  abstract getGridState(gridId: string): Promise<any>;
}
