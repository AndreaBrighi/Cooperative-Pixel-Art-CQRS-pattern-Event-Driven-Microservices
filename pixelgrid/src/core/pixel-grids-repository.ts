import { ColorPixelEvent } from './ColorPixelEvent';

export abstract class PixelGridRepository {
  abstract colorGrid(grid: string, event: ColorPixelEvent);
}
