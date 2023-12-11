import { ColorPixelEvent } from './ColorPixelEvent';

export abstract class PixelGridRepository {
  abstract updateGrid(grid: string, event: ColorPixelEvent);
}
